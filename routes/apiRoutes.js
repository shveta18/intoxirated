var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {

  // If the user searches for beverage, the sql code will query, the userResults table and display
  // ADD CODE HERE TO LIMIT THE RESULTS TO THE ID OF THE USER. 
  app.get("/api/search/", function (req, res) {
    console.log("Query is: ");
    console.log(req.query);
    // If the user is logged in and there is a session ID then proceed to search the DB
    // else redirect to the login page.
    if (req.session.user && req.cookies.sid) {
      // get the user session and user id from the request
      var loggedUserId = req.session.user.id;
      var searchCategory = req.query.category;
      var searchName = req.query.name;
      var searchManufacturer = req.query.manufacturer;
      var searchStyle = req.query.style;

      db.UserRatings.findAll({
        where: {
          [Op.and]: [{ UserID: loggedUserId }, { category: searchCategory }],
          name: {
            [Op.like]: '%' + searchName + '%'
          },
          [Op.or]: [
            {
              manufacturer: {
                [Op.like]: '%' + searchManufacturer + '%'
              }
            },
            {
              style: {
                [Op.like]: '%' + searchStyle + '%'
              }
            }]
        }
      }).then(function (data) {
        console.log("The SQL Query results are:");
        console.log(data);
        res.json(data);
      });
    } else {
      res.json({ "isUserLoggedIn": false });
    }
  });

  // ALL USER PROFILE RATINGS REGARDLESS OF CATEGORY 
  app.get("/api/allratings", function (req, res) {
    console.log("Query is: ");
    console.log(req.query);
    // If the user is logged in and there is a session ID then proceed to search the DB
    // else redirect to the login page.
    if (req.session.user && req.cookies.sid) {
      // get the user session and user id from the request
      var loggedUserId = req.session.user.id;

      db.UserRatings.findAll({
        where: {
          UserID: loggedUserId 
        }
      }).then(function (data) {
        console.log("The SQL Query results are:");
        console.log(data);
        res.json(data);
      });
    } else {
      res.json({ "isUserLoggedIn": false });
    }
  });

  // USER SUBMITS NEW RECORD / RATING
  app.post("/api/rate", function (req, res) {
    console.log("New Ratings sent:");
    console.log(req.body);

    if (req.session.user && req.cookies.sid) {
      // get the user session and user id from the request
      var loggedUserId = req.session.user.id;
      var category = req.body.category;
      var name = req.body.name;
      var manufacturer = req.body.manufacturer;
      var style = req.body.style;
      var rating = req.body.rating;
      // code to verify if username and password combination exists in db 
      db.UserRatings.create({
        category: category,
        name: name,
        manufacturer: manufacturer,
        style: style,
        rating: rating,
        UserId: loggedUserId,
      }
      ).then(function (data) {
        console.log(data);
      });
    }

  });

  // USER LOGIN CHECK in SQL DB 

  app.post("/user-login", function (req, res) {
    console.log("Login details sent:");
    console.log(req.body);
    // code to verify if username and password combination exists in db 
    db.Users.findOne({
      where: {
        userid: req.body.userid, password: req.body.password
      }
    }).then(function (data) {
      console.log("checkpoint 1");
      console.log(data);
      console.log("checkpoint 2");
      //store the user id as a req session id. 
      if (data != null && data != '' && data != []) {
        // res.redirect('/myratings');
        req.session.user = data.dataValues;
        console.log("user session id: ");
        console.log(req.session.user);
        res.json(
          {
            "result": "success"
          }
        );

      } else {
        res.json({ "result": "failure" });
      }
    });
  });



  // Create a new user in SQL DB when a new user registers
  app.post("/user-registration", function (req, res) {
    console.log("User data being sent to SQL");
    console.log(req.body);
    db.Users.create({ userid: req.body.userid, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password }).then(function (data) {
      res.json(data)
    });
  });
};
