var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  // Load index page
  
  app.get("/", function(req, res) {
    res.render("landingpage2")
  });

  app.get("/index", function(req, res) {
    res.render("index")
  });
  
  app.get("/add-wine", function(req, res) {
    res.render("add-Wine")
  })
  
  app.get("/wine", function(req, res) {
    db.Wine.findAll({}).then(function(data) {
      console.log(data)
      res.render("wine", {wines: data})
    });
  });

  app.get("/wine-search", function(req, res) {
    var name = req.query.name
    var manufacturer = req.query.manufacturer
    var style = req.query.style
    db.Wine.findAll({
      where: {
        name: {
          [Op.like]: '%'+ name + '%'
        },
        style: {
          [Op.like]: '%'+ style + '%'
        },
        manufacturer: {
          [Op.like]: '%'+ manufacturer + '%'
        }, 
      }
    }).then(function(data) {
      res.json(data)
    })
  })

  app.get("/add-beer", function(req, res) {
    res.render("add-Beer")
  })

  app.get("/beer", function(req, res) {
    db.Beer.findAll({}).then(function(data) {
      console.log(data)
      res.render("beer", {beers: data})
    });
  });

  app.get("/add-whiskey", function(req, res) {
    res.render("add-whiskey")
  })

  app.get("/whiskey", function(req, res) {
    db.Beer.findAll({}).then(function(data) {
      console.log(data)
      res.render("whiskey", {whiskeys: data})
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
