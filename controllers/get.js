/**
 * 
 * PURPOSE: Controls all GET requests
 * 
 */

module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    getLogin: (req, res) => {
        res.render("login.ejs");
      },
    getSignUp: (req, res) => {
        res.render("signup.ejs");
      },
  };