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


// listen on port 3000
let port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log(`Listening on port: ${port}`);
    });
});
