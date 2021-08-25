// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: {
    name: 'id',
    allowNull: false
  },
  onDelete: 'CASCADE',
  as: 'Product Category'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: {
    name: 'id',
    allowNull: false
  },
  onDelete: 'CASCADE',
  as: 'Category Product'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  }, 
  onDelete: 'CASCADE',
  as: 'Product Tag'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  }, 
  onDelete: 'CASCADE',
  as: 'Tag Product'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
