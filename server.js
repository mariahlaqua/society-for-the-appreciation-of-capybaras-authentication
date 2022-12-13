const express = require('express');
const app = express(); 
const ejs = require('ejs') 
const { Sequelize } = require('sequelize');
require("dotenv").config({path: './.env'}); 
const seq = require('./config/database'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const logger = require('morgan'); 
const homeRoutes = require('./routes/home'); 
const SessionStore = require('express-session-sequelize')(session.Store); 
const sequelizeSessionStore = new SessionStore({ db: seq, }); 



//use static files in this directory
app.use(express.static('./public'));

//set view engine
app.set('view engine', 'ejs');

// formatting the http, req.body json, morgan to make logging easier to read
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"))

// use cookieparser to parse and sign cookies, default setting is http only to discourage XSS attacks
app.use(cookieParser());

// use express-session to initiate sessions, set cookie max age to one hour
// NOTE: It is possible to enable stronger security settings on the cookie
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sequelizeSessionStore,
    cookie: {
        maxAge:60 * 60 * 1000,
    }
}));

// routing
app.use('/', homeRoutes);


// listen to the server
app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
  });