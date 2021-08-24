const express = require('express');
const routes = require('./routes');
const colorLog = require('./middleware/colorLog');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(colorLog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
