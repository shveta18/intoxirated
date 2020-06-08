var db = require("../models");
var Sequelize = require("sequelize");
var session = require("express-session");

const Op = Sequelize.Op;

module.exports = function (app) {


  // LOAD INDEX PAGE
  app.get("/", function (req, res) {
    res.render("landingpage2")
  });


  // USER LOGOUT 
  app.get("/logout", function (req, res) {
    console.log("User logout out req received");
    req.session.destroy();
    res.render("logout");
  });

  // AUTHENTICATION: IF USER LOGIN SUCCESSFUL, SHOW MYRATINGS PAGE
  app.get("/myratings", function (req, res) {
    console.log(req.session.user);
    console.log(req.cookies.sid);
    if (req.session.user && req.cookies.sid) {
      res.render("myratings");
    } else {
      res.redirect("/");
    }
  });

  // AUTHENTICATION: Login post

  app.get("/index", function (req, res) {
    res.render("index")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
