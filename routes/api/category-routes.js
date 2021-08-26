const categoryRouter = require('express').Router();
const { Category } = require('../../models');
const clog = require('../../helpers/colorLogger');


// The `/api/categories` endpoint

categoryRouter.get('/', async (req, res) => {
  try{
    let categories = await Category.findAll({
      include: [{all: true, nested: true}],
    });
    res.status(200).json(categories);
  }catch(err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

/**
 * Single get route taking an id paramter
 */
categoryRouter.get('/:id', async (req, res) => {
  try{
    // get the category that corresponds to the req.params.id
    let category = await Category.findByPk(req.params.id, {
      include: [{all: true, nested: true}],
    });
    if(!category){
      res.status(404).json({message: `No category for id ${req.params.id}`});
    }
    res.status(200).json(category);
  }catch(err){
    res.status(500).json(err);
  }
});

categoryRouter.post('/', async(req, res) => {
  // validate request has valid body.category_name
  if(!req.body.category_name){
    res.status(400).json({message: "Request lacked a category_name in the body"});
  //otherwise continue with the request handling
  } else{
    // get the category that corresponds to the req.params.id
    await Category.create(req.body, {
      include: [{all: true, nested: true}],
    }).then((categoryObj)=>{
      // happy path
      res.status(200).json({message: `Successfully added category: ${categoryObj.category_name}`});
    }).catch((err)=>{
      // if we fail validation
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json({message: `Cannot add category with ${err.errors[0].path} containing non space or alpha characters`});
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

/**
 * A route that handles updating a specific category with a new category_name,
 */
categoryRouter.put('/:id', async (req, res) => {
  // validate request has valid body.category_name
  if(!req.body.category_name){
    res.status(400).json({message: "Request lacked a category_name in the body"});
  //otherwise continue with the request handling
  } else{
    try{
      let categoryToUpdate = await Category.findByPk(req.params.id);
      // if there is a category returned
      if(categoryToUpdate){
        let pastName = categoryToUpdate.category_name;
        // update is a promise so we need to call then and catch to intercept sequelize validation errors
        categoryToUpdate.update({
          'category_name': req.body.category_name
        }).then((something)=>{
          // happy path
          res.status(200).json({message:`Updated ${pastName} to ${categoryToUpdate.category_name}`})
        }).catch((err)=>{
          // if we fail validation
          if(err.name === 'SequelizeValidationError'){
            res.status(400).json({message: `Cannot update category name with non space and alpha characters`});
          }
        })
      // if category is missing
      } else{
        res.status(404).json({message: `No category with id: ${req.params.id} found`});
      }
    // if something else went wrong
    }catch(err){
      if(err.name === "Not category_name paramter in request body"){
        res.status(400).json({message: `Request body lacked a 'category_name' value`})
      } else {
        // if something went wrong in the server
        res.status(500).json({message: `Failed to update using id:${req.params.id}`});
      }
    }
  }
});

/**
 * A route that deletes a category by id
 */
categoryRouter.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    let categoryToDestroy = await Category.findByPk(req.params.id);
    // if there is a category returned
    if(categoryToDestroy){
      let savedDeletedName = categoryToDestroy.category_name;
      // destroy is a promise so we need to call then and catch to intercept sequelize validation errors
      await categoryToDestroy.destroy()
      .then(()=>{
        // happy path
        res.status(200).json({message:`Deleted ${savedDeletedName}`})
      }).catch((err)=>{
        clog(err, 'red');
      })
    // if category is missing
    } else{
      res.status(404).json({message: `No category with id: ${req.params.id} found`});
    }
  // if something else went wrong
  }catch(err){
    // if something went wrong in the server
    res.status(500).json({message: `Failed to delete category using id:${req.params.id}`});
  }
});

module.exports = categoryRouter;
