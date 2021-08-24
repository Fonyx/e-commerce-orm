const categoryRouter = require('express').Router();
const { Category, Product } = require('../../models');

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
  try{
    // get the category that corresponds to the req.params.id
    let category = await Category.create(req.body, {
      include: [{all: true, nested: true}],
    });
    console.log('')
    res.status(200).json(category);
  }catch(err){
    res.status(500).json(err);
  }
});

categoryRouter.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

categoryRouter.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = categoryRouter;
