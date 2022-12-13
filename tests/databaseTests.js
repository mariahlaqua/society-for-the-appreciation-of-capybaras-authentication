const { Sequelize, Model } = require('sequelize')
require("dotenv").config({ path: '../.env' });
const seq = require('../config/seqInstance')
const User = require('../models/User')
const bcrypt = require('bcrypt');

//// test database connection

// async function dbConnection(){
//     try{
//         await seq.authenticate();
//         console.log("Connected to the database");
//     }catch(error){
//         console.log(error)
//     }
// };
// dbConnection();

//// test User export with query

// async function getUsers() {
//  try{
//     const users = await User.findAll()
//     console.log(users);
//  }catch(error){
//     console.log(error)
//  }
// }

// getUsers();