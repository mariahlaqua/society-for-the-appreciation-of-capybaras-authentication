/***********
 * Test password validation method
 * 
 **************/

const { Sequelize } = require('sequelize');
const User  = require('../models/User')
const bcrypt = require('bcrypt');
const seq = require('../config/database')

seq;
let user
async function testPassword(){
    try{
    user = await User.findOne({where: {email: 'hi@email.com'}})
    let result = await user.validPassword('papaya')
    console.log(result)
    }catch(error){
        console.log(error)
    }
}

testPassword();
