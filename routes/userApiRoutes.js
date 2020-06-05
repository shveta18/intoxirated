var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    app.post("/api/user", function(req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function(data) {
            res.json(data)
        })
    })

    app.post("/api/user-login", passport.authenticate("local"), function(req, res) {
        res.json(req.user)
        })

    app.get("/api/user", function(req, res) {
        db.User.findAll({}).then(function(data) {
            res.json(data)
        })
    })
}

