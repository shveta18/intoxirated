// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// Session library
var session = require("express-session");
var bycriptjs = require("bcryptjs");
var passport = require("passport");
var db = require("./models");
var cookieParser = require('cookie-parser');


var app = express();
var PORT = process.env.PORT || 3000;
var maxage = 1000 * 60 * 60;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
// setting user sessions 
app.use(session({
  key: 'sid',
  secret: 'secret dodo project',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: maxage }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// Got from: https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3 
app.use((req, res, next) => {
  if (req.cookies.sid && !req.session.user) {
    res.clearCookie('sid');
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.sid) {
      res.redirect('/myratings');
  } else {
      next();
  }    
};

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/userApiRoutes")(app);
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
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
