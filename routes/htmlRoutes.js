var db = require("../models");

module.exports = function(app) {
  // Load index page
  
  app.get("/", function(req, res) {
    res.render("index")
  });
  
  
  
  app.get("/add-wine", function(req, res) {
    res.render("addWine")
  })
  
  app.get("/wine", function(req, res) {
    db.Wine.findAll({}).then(function(data) {
      console.log(data)
      res.render("wine", {wines: data})
    });
  });

  app.get("/beer", function(req, res) {
    res.render("beer-manager")
  })

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
