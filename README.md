# Project: [E-Commerce ORM](https://github.com/Fonyx/eCommerceOrm)

## Version

1.0.0  

![badmath](https://img.shields.io/github/license/Fonyx/eCommerceOrm)  ![badmath](https://img.shields.io/github/languages/count/Fonyx/eCommerceOrm)  ![badmath](https://img.shields.io/github/commit-activity/m/Fonyx/eCommerceOrm)  ![badmath](https://img.shields.io/github/contributors/Fonyx/eCommerceOrm)  

## Description

A basic ORM project that mocks up an e-commerce website for selling category products with description tags. 
Built using Express and Sequelize, tested with Insomnia and Jest.  

![Alt text](https://github.com/Fonyx/eCommerceOrm/blob/main/Assets/images/show.gif?raw=true "show capture gif")  

## License

GNU General Public License v3.0  

### Details  

```Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.  ```

### Permissions  

```commercial-use,modifications,distribution,patent-use,private-use  ```

## Content 

- [Dependencies](#dependencies)
- [Usage](#usage)
- [Contributors](#contributors)
- [Installation](#installation)
- [Credits](#credits)
- [Features](#features)
- [Contributing](#contributing)
- [Testing](#testing)
- [Questions](#questions)




## Dependencies  

[dotenv:^8.2.0](https://www.npmjs.com/package/dotenv)

[express:^4.17.1](https://www.npmjs.com/package/express)

[jest:^27.0.6](https://www.npmjs.com/package/jest)

[mysql2:^2.1.0](https://www.npmjs.com/package/mysql2)

[sequelize:^5.21.7](https://www.npmjs.com/package/sequelize)



## Usage

With server running @ localhost:3001/api/ options are:  
- Add a product tag using /tags with a post request
- Add a category using /categories with a post request
- Add a product using /product with a post request
- POST, PUT or DELETE using the corresponding url ending and HTTP request type  

## Contributors 

[Fonyx](https://github.com/Fonyx)

## Installation

1: Install Mysql and NPM  
2: Checkout Project software  
3: 'npm install' to grab project dependencies  
4: From the mysql shell, run 'source db/schema.sql;' to create a database named 'ecommerce_db';  
4: 'npm run seed' to populate data base with starting data and to structure it using sequelize  
5: 'npm start' to run server  

## Credits

No credits as this was a homework project  

## Features

1: Express routes for GET, POST, PUT AND DELETE http requests  
2: Models representing Category, Product Tag, and Products to be acted on by the above requests  
3: Basic jest test suit for custom validator testing  

## Contributing

This project is closed to contributions  

## Testing

Jest framework with coverage  

## Questions
nick.alex.ritchie@gmail.com  

## Checkout my github account [Fonyx](https://github.com/Fonyx)



