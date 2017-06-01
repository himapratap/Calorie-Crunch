// Solution 2: Customer Relations
// ===========================================

// Step 1: Created a Customer model in ./models/customer.js
// Step 2: Updated the Burger model to have a hasOne(models.Customer) relation
// Step 3: Updated the handlebars to display a customers name if there's a 'Customers' property on the Burger
// Step 4: Updated queries in burgerController for updating a burger to add the CustomerId
// Step 5: Updated findAll query  in burger_controller for burgers to "include" the customer
// Step 6: Updated findAll query in burger_controller to order returned burgers by burger_name.


var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// bring in the models
var db = require("./models");
var session = require("express-session");
var passport = require("./config/passport");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/calorieCrunch");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// Watson Code
//=========================================================
require('dotenv').load({ silent: true });

// on bluemix, enable rate-limiting and force https
if (process.env.VCAP_SERVICES) {
  // enable rate-limiting
  const RateLimit = require('express-rate-limit');
  app.enable('trust proxy'); // required to work properly behind Bluemix's reverse proxy

  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  });

  //  apply to /api/*
  app.use('/api/', limiter);

  // force https - microphone access requires https in Chrome and possibly other browsers
  // (*.mybluemix.net domains all have built-in https support)
  const secure = require('express-secure-only');
  app.use(secure());
}

// token endpoints
// **Warning**: these endpoints should probably be guarded with additional authentication & authorization for production use
app.use('/api/speech-to-text/', require('./stt-token.js'));
app.use('/api/text-to-speech/', require('./tts-token.js'));

// chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server at https://localhost3001/ using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at http://<myapp>.mybluemix.net
if (!process.env.VCAP_SERVICES) {
  const fs = require('fs');
  const https = require('https');
  const HTTPS_PORT = 3001;

  const options = {
    key: fs.readFileSync(__dirname + '/keys/localhost.pem'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.cert')
  };
  https.createServer(options, app).listen(HTTPS_PORT, function() {
    console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
  });
}



// listen on port 3000
let port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log(`Listening on port: ${port}`);
    });
});
