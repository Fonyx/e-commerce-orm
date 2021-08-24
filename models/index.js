// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  as: 'Product Category'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  as: 'Category Product'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: true,
  }, 
  as: 'Product Tag'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: true,
  }, 
  as: 'Tag Product'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
