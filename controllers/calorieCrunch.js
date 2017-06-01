// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last week's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");
var passport = require("../config/passport");
var request = require("request")


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


router.post("/searchfood", function(req, res) {


    let items = req.body.foodsearch
    let appID = "48e9aea9";
    let appKey = "3cfd31e974a75dc9c2b9cc64a1b40dd6";

    request("https://api.nutritionix.com/v1_1/search/"+items+"?results=0:10&fields=item_name,nf_servings_per_container,nf_cholestorol,nf_saturated_fat,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_size_qty,nf_total_fat,brand_name,item_id,nf_calories&appId="+appID+"&appKey="+appKey, function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            console.log(body.hits[0])
            // console.log(body)
            // console.log(body)


        }
    });

    // db.User.create({
    //     email: req.body.email,
    //     password: req.body.password
    // }).then(function() {
    //     console.log("signup complete");
    //     res.render("user", {
    //         'name': req.body.name
    //     });

    // }).catch(function(err) {
    //     res.json(err);
    // });
});

router.post("/addFood", (req, res) => {
    console.log("adding food", req.body);
    let food = {
        food: req.body.food,
        quantity: req.body.quantity,
        time: db.sequelize.literal('CURRENT_TIMESTAMP'),
        UserId: req.body.userId
    };


    db.Activity.create(food, {raw:true}).then(res.redirect("/user"))
});

module.exports = router;
