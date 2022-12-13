/****
 * 
 * PURPOSE: Defines the SQL table "Users" and schema with sequelize, exports the User model to the rest of the application.
 * Includes: first_name, last_name, email, password, recent_login, created_at, updated_at
 * 
 * Additionally:
 *  - hashes password with bcrypt before saving to Db
 *  - adds validPassword method to User, for easily comparing user's password with user's input
 *  - adds recentLoginUpdate method to User, to update timestamp upon successful login
 * 
 * Optimization Ideas:
 *  - create functions to further simplify querying and updating
 *  - hashing switched to argon2, which is faster and now recommended over bcrypt by OWASP
 * 
 * 
 **************************************************/


const bcrypt = require('bcrypt');
const { Sequelize, DataTypes} = require('sequelize');
require("dotenv").config({ path: '../.env' });
const seq = require('../config/database');


// initialize new Sequelize instance
seq;

// 
const User = seq.define('User', {
  first_name: {
      type: DataTypes.STRING,
      allowNull: false,    
  },
  last_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },
  recent_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    }
},
    {
    underscored: true,
    hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },   
});


// adding a password validation with bcrypt to instance of model
User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// time update to recent_login, to be called in login function
User.prototype.recentLoginUpdate = function(reqEmail){
    return User.update({recent_login: seq.literal('CURRENT_TIMESTAMP')},{where: {email : reqEmail}}) 
}



// creating the users table
seq.sync().then(() =>{
  console.log('Users table created successfully!');
}).catch((error)=>{
  console.error('Something went wrong:', error);
});




//export the model
module.exports = User;