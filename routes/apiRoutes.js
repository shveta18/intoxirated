var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/wine", function(req, res) {
    db.Wine.create(req.body).then(function(data) {
      res.json(data)
    })
  })

  app.post("/api/beer", function(req, res) {
    db.Wine.create(req.body).then(function(data) {
      res.json(data)
    })
  })

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
