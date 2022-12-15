/***********
 * Test password validation method
 * Enter email and password to test in userEmail and password variables as strings
 **************/

const { Sequelize } = require('sequelize');
const User  = require('../models/User')
const bcrypt = require('bcrypt');
const seq = require('../config/database')
let userEmail = "";
userEmail = userEmail.toLowerCase();
let password = "";

seq;
let user
async function testPassword(){
    try{
    user = await User.findOne({where: {email: userEmail}})
    let result = await user.validPassword(password)
    console.log(result)
    }catch(error){
        console.log(error)
    }
}

testPassword();
