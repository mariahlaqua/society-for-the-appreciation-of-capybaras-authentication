/*****
 * PURPOSE: Controllers for handling POST requests related to authentication => SIGNUP, LOGIN
 *
 * Additionally:
 *  - Performs some basic validation on user input, generates & renders errors, redirects when necessary.
 *  - Updates recent_login in db after successful login
 * 
 * Further optimizations would be nice: 
 *  - Login form has minimal validation
 *  - Max password length validation to prevent DOS attacks
 *  - Additional input sanitization/validation
 * 
 ********/

const validator = require("validator");
const { Sequelize } = require('sequelize')
require("dotenv").config({ path: '../.env' });
const seq = require('../config/database');
const User = require('../models/User');



module.exports = {
    signup: async (req, res) => {
        console.log(req.body)
        let user
        const validationErrors = [];
        if (!validator.isAlpha(req.body.first_name))
            validationErrors.push({msg: "Must contain only alphabetical characters."});
        if (!validator.isAlpha(req.body.last_name))
            validationErrors.push({msg: "Must contain only alphabetical characters."})
        if (!validator.isEmail(req.body.email))
            validationErrors.push({msg: "Please enter a valid email address."});
        if (!validator.isLength(req.body.password, { min: 8 }))
            validationErrors.push({
              msg: "Password must be between 8-64 characters long",
            });
        if (req.body.password !== req.body.confirmPassword)
            validationErrors.push({ msg: "Passwords do not match" });
        if(validationErrors.length){
            return res.render('signup.ejs', {errors: validationErrors})
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });
        try{ 
            user = await User.findOne({where: {email : req.body.email}}).then(user =>{
            if(user){
                validationErrors.push({msg: "User already exists with that email, please login."})
                return res.render('login.ejs', {errors: validationErrors})
            }
            if(!user){
                console.log(req.body)
                User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password})
                .then((res) => {
                    console.log(`Insert successful: UUID ${res.id} created at ${res.created_at}`) 
                });
                
                return res.render('feed.ejs')
            };  
            })
            }catch(error){
                return console.log(error)
            };
        
    },
    login: async (req, res) => {
        console.log(req.body, req.session.cookie)
        console.log(req.session)
        const validationErrors = []
        let user
        if(!req.body.email || !req.body.password){
            validationErrors.push({msg: "Email and password are required."})
            return res.render('login.ejs', {errors: validationErrors})
        }
        try{ 
            user = await User.findOne({where: {email : req.body.email}}).then(user =>{
            if(!user){
                validationErrors.push({msg: "User does not exist, please sign up."})
                return res.render('signup.ejs', {errors: validationErrors})
            }
            if(user){
                return user;
            }
            })
            }catch(error){
                return console.log(error)
            };

        try{
            const result = await user.validPassword(req.body.password);
                console.log(result)
                if(result == false){
                    validationErrors.push({msg: "Incorrect password."})
                    return res.render('login.ejs', {errors: validationErrors})
                }
                if(result){
                    user.recentLoginUpdate(req.body.email)
                    return res.render('feed.ejs')
                }
            }catch(error){
                return console.log(error)
            }

}
}