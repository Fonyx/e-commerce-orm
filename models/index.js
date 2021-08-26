// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  // foreignKey: {
  //   name: 'id',
  //   allowNull: false
  // },
  // onDelete: 'CASCADE',
  as: 'Category'
});

// Categories have many Products
Category.hasMany(Product, {
  // foreignKey: {
  //   name: 'id',
  //   allowNull: false
  // },
  // onDelete: 'CASCADE',
  as: 'Products'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  }, 
  // onDelete: 'CASCADE',
  as: 'Tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  }, 
  // onDelete: 'CASCADE',
  as: 'Products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
