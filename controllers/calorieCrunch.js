// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last week's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");
var passport = require("../config/passport");


var router = express.Router();
// grabbing our models
var db = require("../models");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//Starting point in the app
router.get("/", function(req, res) {
    res.render("index", "");
});
// Direct to SignUp page
router.get("/signup", function(req, res) {
    res.render("signup", "");
});

// Direct to Login page
router.get("/login", function(req, res) {
    res.render("login", "");
});


router.post("/verifyLogin", passport.authenticate("local", {
    successRedirect: '/user', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
}));

router.get("/user", isAuthenticated, function(req, res) {
    res.render("user", req.session.passport.user);
});

router.post("/signup", function(req, res) {
    console.log(`Starting signup process : }`);
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        activityLevel: req.body.activityLevel
    };
    db.User.create(user, {
        raw: true
    }).then(function(results) {
        let user = results.get({
            plain: true
        });
        console.log("Signup complete", user);
        res.redirect("/user");

    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/addFood", (req, res) => {
    console.log("adding food", req.body);
    let food = {
        food: req.body.food,
        quantity: req.body.quantity,
        time: db.sequelize.literal('CURRENT_TIMESTAMP'),
        userId: req.body.userId
    };

    db.Activity.create(food, {
        raw: true
    }).then(res.redirect("/user"))
});

module.exports = router;
