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

// create new product, lots of parameter vetting for category and tag
router.post('/', async (req, res) => {
  // check post structure
  if(!req.body.product_name || !req.body.price || !req.body.stock || !req.body.tagIds){
    res.status(400).json({message: "Request lacked a paramter in the body"});
    return
  }
  // get categories
  let categories = await Category.findAll({
    order:[['id', 'ASC'],],
  });
  let allCategoryNames = categories.map((categoryObj) => categoryObj.id+':'+categoryObj.category_name);
  // get tag names
  let tags = await Tag.findAll({
    attributes: ['id','tag_name'],
    order:[['id', 'ASC'],],
  });
  // map tag names and their index for reactive user attempt to fix failed post query
  let allTagNames = tags.map((tagObj) => tagObj.id+':'+tagObj.tag_name);
  // make list of requested tag id numbers
  let availableTagIds = tags.map((tagObj) => tagObj.id);
  // check that all the tag id's are present
  for(let i=0; i<req.body.tagIds.length; i++){
    let currentReqTag = req.body.tagIds[i];
    if(!availableTagIds.includes(currentReqTag)){
      res.status(400).json({message:`Unable to find Tag in request, please choose from: ${allTagNames}`});
      return
    }
  }
  // check there is either a category_name or category_id
  if(!req.body.category_name && !req.body.category_id){
    res.status(400).json({message: "Request lacked either category_name or category_id in the body"});
    return
  }
  // package for product create details, it will eventually have product_name, category_id, price, stock
  let package = {
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock
  };
  // if there is a category_name, retrieve the id
  if(req.body.category_name){
    let categoryObj = await Category.findOne({ where: {category_name: req.body.category_name} });
    if(categoryObj){
      package['category_id'] = categoryObj.id;
    // if no category matched, return a 400 response and list available category names
    } else {
      res.status(400).json({message: `Category: ${req.body.category_name} could not be found. Use one from ${allCategoryNames}`});
      return
    }
  // if there is no category name, there must be a category_id passed in, see above checks
  } else {
    package['category_id'] = req.body.category_id;
  }
  // create object logic - we use the exploded create syntax since we are adding details to the req.body params
  Product.create(package)
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
      res.status(400).json({message: `Cannot add product with ${err.errors[0].path} containing non space or alpha characters`});
    } else if(err.name === 'SequelizeUniqueConstraintError'){
      // RFC2616 states error 400 as : the server cannot or will not process the request due to something that is perceived to be a client error
      // we wil use this as the client trying to add an entry that is already there is their own fault
      res.status(400).json({message: `Product ${req.body.product_name} already exists`});
    } else{
      res.status(500).json(err);
    }
  });
  
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  // check post structure
  if(!req.body.product_name || !req.body.price || !req.body.stock || !req.body.tagIds){
    res.status(400).json({message: "Request lacked a paramter in the body"});
    return
  }
  // get categories
  let categories = await Category.findAll({
    order:[['id', 'ASC'],],
  });
  let allCategoryNames = categories.map((categoryObj) => categoryObj.id+':'+categoryObj.category_name);
  // get tag names
  let tags = await Tag.findAll({
    attributes: ['id','tag_name'],
    order:[['id', 'ASC'],],
  });
  // map tag names and their index for reactive user attempt to fix failed post query
  let allTagNames = tags.map((tagObj) => tagObj.id+':'+tagObj.tag_name);
  // make list of requested tag id numbers
  let availableTagIds = tags.map((tagObj) => tagObj.id);
  // check that all the tag id's are present
  for(let i=0; i<req.body.tagIds.length; i++){
    let currentReqTag = req.body.tagIds[i];
    if(!availableTagIds.includes(currentReqTag)){
      res.status(400).json({message:`Unable to find Tag in request, please choose from: ${allTagNames}`});
      return
    }
  }
  // check there is either a category_name or category_id
  if(!req.body.category_name && !req.body.category_id){
    res.status(400).json({message: "Request lacked either category_name or category_id in the body"});
    return
  }
  // package for product create details, it will eventually have product_name, category_id, price, stock
  let package = {
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock
  };
  // if there is a category_name, retrieve the id
  if(req.body.category_name){
    let categoryObj = await Category.findOne({ where: {category_name: req.body.category_name} });
    if(categoryObj){
      package['category_id'] = categoryObj.id;
    // if no category matched, return a 400 response and list available category names
    } else {
      res.status(400).json({message: `Category: ${req.body.category_name} could not be found. Use one from ${allCategoryNames}`});
      return
    }
  // if there is no category name, there must be a category_id passed in, see above checks
  } else {
    package['category_id'] = req.body.category_id;
  }
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
      res.status(400).json({message: `Cannot add product with ${err.errors[0].path} containing non space or alpha characters`});
    } else if(err.name === 'SequelizeUniqueConstraintError'){
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
    res.status(500).json({message: `Failed to delete product using id:${req.params.id}`});
  }
});

module.exports = router;
