// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// Session library
var session = require("express-session");
var bycriptjs = require("bcryptjs");
var passport = require("passport");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
var maxage = 1000 * 60 *60;
var sessid = 'sid';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
var sessid = 'sid';
// setting user sessions 
app.use(session({
  name: sessid,
  secret: 'secret dodo project',
  saveUninitialized: false,
  cookie: {maxAge: maxage, secure: false }
}))
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/userApiRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };


// setting 
// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
