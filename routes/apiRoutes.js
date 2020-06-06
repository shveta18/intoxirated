var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {

  // Get request from front end to search db by criteria entered. 
  app.get("/api/search/", function (req, res) {
    console.log("Query is: ");
    console.log(req.query);
    var searchName = req.query.name;
    var searchManufacturer = req.query.manufacturer;
    var searchStyle = req.query.style;
    db.Whiskey.findAll({
      where: {
        name: {
          [Op.like]: '%' + searchName + '%'
        },
        manufacturer: {
          [Op.like]: '%' + searchManufacturer + '%'
        },
        style: {
          [Op.like]: '%' + searchStyle + '%'
        }
      }


      // manufacturer: req.body.manufacturer, 
      // style: req.body.style

    }).then(function (data) {
      console.log(data);
      res.json(data);
    });
  });


  // USER LOGIN CHECK in SQL DB 

  app.post("/user-login", function(req,res) {
    console.log("Login details sent:");
    console.log(req.body);
    // code to verify if username and password combination exists in db 
    db.Users.findAll({
      where: {
        userid: req.body.userid, password: req.body.password
      }
    }).then(function(data) {
      console.log(data);
      if(data!=null && data !== '') {
        res.redirect('/myratings');
      } 
    });
  });
// Create a new user in SQL DB when a new user registers
app.post("/user-registration", function(req, res) {
  console.log("User data being sent to SQL");
  console.log(req.body);
  db.Users.create({userid: req.body.userid, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password}).then(function(data) {
    
    res.json(data)
  });
});


  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  // Get all results from the sql db for the search criteria. 
  // app.get("/api/whiskey", function(req, res) {
  // db.

  // })

  // Create a new example
  app.post("/api/wine", function (req, res) {
    db.Wine.create(req.body).then(function (data) {
      res.json(data)
    })
  })

  app.post("/api/beer", function (req, res) {
    db.Wine.create(req.body).then(function (data) {
      res.json(data)
    })
  })

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
