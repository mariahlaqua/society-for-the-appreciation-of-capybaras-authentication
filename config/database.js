/*
  **************
  PURPOSE: Creates and exports a new sequelize instance to use in the rest of the app
  **************
*/

const { Sequelize }= require('sequelize');
require("dotenv").config({ path: '../.env' });


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,
{
  host: 'localhost',
 dialect: 'mysql',
});


module.exports = sequelize;