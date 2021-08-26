const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const clog = require('../../helpers/colorLogger');
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    let tags = await Tag.findAll({
      include: [{all: true, nested: true}],
    });
    if(!tags){
      res.status(404).json({message: "No tags found"});
    } else {
      res.status(200).json(tags);
    }
  }catch(err){
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    // get the category that corresponds to the req.params.id
    let tag = await Tag.findByPk(req.params.id, {
      include: [{all: true, nested: true}],
    });
    if(!tag){
      res.status(404).json({message: `No product for id ${req.params.id}`});
    }
    res.status(200).json(tag);
  }catch(err){
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // check that the body has a tag_name in it
  if(!req.body.tag_name){
    res.status(400).json({message: "Request body lacks tag_name attribute"})
  } else {
    // create a new tag
    await Tag.create(req.body, {
      include: [{all: true, nested: true}],
    }).then((tagObj) => {
      // happy path
      res.status(200).json({message: `Successfully added tag: ${tagObj.tag_name}`})
    }).catch((err)=> {
      // if string validation fails
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json({message: `Cannot add tag with ${err.errors[0].path} containing non space or alpha characters`});
      } else if(err.name === 'SequelizeUniqueConstraintError'){
        // RFC2616 states error 400 as : the server cannot or will not process the request due to something that is perceived to be a client error
        // we wil use this as the client trying to add an entry that is already there is their own fault
        res.status(400).json({message: `Category ${req.body.category_name} already exists`});
      } else{
        res.status(500).json(err);
      }
    })
  }
});

router.put('/:id', (req, res) => {
  // check that the body has a tag_name attribute
  if(!req.body.tag_name){
    res.status(400).json({message: "Request body lacks a tag_name"});
  } else {
    // update a tag's name by its `id` value
    Tag.findByPk(req.params.id)
      .then((tagObj) => {
        if(tagObj){
          let pastName = tagObj.tag_name;
          tagObj.update({'tag_name': req.body.tag_name})
          .then((resp)=>{
            res.status(200).json({message: `Updated ${pastName} to ${tagObj.tag_name}`});
          })
          .catch((err) => {
            // if something went wrong in the server
            clog(err, 'red')
            res.status(500).json({message: `Failed to update using id:${req.params.id}`});
          })
        }
      });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    let tagToDestroy = await Tag.findByPk(req.params.id);
    // if there is a category returned
    if(tagToDestroy){
      let savedDeletedName = tagToDestroy.tag_name;
      // destroy is a promise so we need to call then and catch to intercept sequelize validation errors
      await tagToDestroy.destroy()
      .then(()=>{
        // happy path
        res.status(200).json({message:`Deleted ${savedDeletedName}`})
      }).catch((err)=>{
        clog(err, 'red');
      })
    // if category is missing
    } else{
      res.status(404).json({message: `No tag with id: ${req.params.id} found`});
    }
  // if something else went wrong
  }catch(err){
    // if something went wrong in the server
    clog(err, red);
    res.status(500).json({message: `Failed to delete tag using id:${req.params.id}`});
  }
});

module.exports = router;
