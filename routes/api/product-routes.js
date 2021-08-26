const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const clog = require('../../helpers/colorLogger');
// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try{
    let products = await Product.findAll({
      include: [{all: true, nested: true}],
    });
    res.status(200).json(products);
  }catch(err){
    res.status(500).json(err);
  }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try{
    // get the category that corresponds to the req.params.id
    let product = await Product.findByPk(req.params.id, {
      include: [{all: true, nested: true}],
    });
    if(!product){
      res.status(404).json({message: `No product for id ${req.params.id}`});
    }
    res.status(200).json(product);
  }catch(err){
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  // check post structure
  if(!req.body.product_name || !req.body.price || !req.body.stock || !req.body.tagIds || !req.body.category_id){
    res.status(400).json({message: "Request lacked a paramter in the body"});
  } else {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    Product.create(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          // returns a promise to be process in subsequent then statement
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => {
        res.status(200).json(productTagIds)
      })
      .catch((err) => {
        // if we fail validation
        if(err.name === 'SequelizeValidationError'){
          res.status(400).json({message: `Cannot add product with name containing non space or alpha characters`});
        }
        if(err.name === 'SequelizeUniqueConstraintError'){
          // RFC2616 states error 400 as : the server cannot or will not process the request due to something that is perceived to be a client error
          // we wil use this as the client trying to add an entry that is already there is their own fault
          res.status(400).json({message: `Product ${req.body.product_name} already exists`});
        } else{
          res.status(500).json(err);
        }
      });
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // if we fail validation
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json({message: `Cannot add product with name containing non space or alpha characters`});
      }
      if(err.name === 'SequelizeUniqueConstraintError'){
        // RFC2616 states error 400 as : the server cannot or will not process the request due to something that is perceived to be a client error
        // we wil use this as the client trying to add an entry that is already there is their own fault
        res.status(400).json({message: `Product ${req.body.product_name} already exists`});
      } else{
        res.status(500).json(err);
      }
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  // delete a category by its `id` value
  try{
    let productToDestroy = await Product.findByPk(req.params.id);
    // if there is a category returned
    if(productToDestroy){
      let savedDeletedName = productToDestroy.product_name;
      // destroy is a promise so we need to call then and catch to intercept sequelize validation errors
      await productToDestroy.destroy()
      .then(()=>{
        // happy path
        res.status(200).json({message:`Deleted ${savedDeletedName}`})
      }).catch((err)=>{
        clog(err, 'red');
      })
    // if category is missing
    } else{
      res.status(404).json({message: `No product with id: ${req.params.id} found`});
    }
  // if something else went wrong
  }catch(err){
    // if something went wrong in the server
    clog(err, red);
    res.status(500).json({message: `Failed to delete product using id:${req.params.id}`});
  }
});

module.exports = router;
