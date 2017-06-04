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
var moment = require("moment");

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

function loadUserProfile(req, res) {
    var date = moment().format("YYYY-MM-DD");
    console.log("Current time", date);
    db.Activity.findAll({
        where: {
            UserId: req.session.passport.user.id,
            updatedAt: date
        },

        raw: true

    }).then(function(results) {
        console.log(results);
        var totalCal = 0;
        results.map((x) => {
            totalCal += x.totalCalories
          })

        let userProfile = {
            'entry': results,
            'totalCal': totalCal,
            'user': req.session.passport.user,
            'searchResults': req.searchResults
        }
        //console.log("userProfile.searchResults", userProfile.searchResults);


        res.render("user", {
            'userProfile': userProfile
        });

    });
}


function searchFood(req, res, next) {

    let item = req.body.foodsearch;
    let appID = "48e9aea9";
    let appKey = "3cfd31e974a75dc9c2b9cc64a1b40dd6";
    let url = "https://api.nutritionix.com/v1_1/search/" + item + "?results=0:10&fields=item_name,nf_servings_per_container,nf_cholestorol,nf_saturated_fat,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_size_qty,nf_total_fat,brand_name,item_id,nf_calories&appId=" + appID + "&appKey=" + appKey;
    request(url, function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            let data = body.hits;
            let items = data.map((x) => {
                return x.fields;
            })
            let searchResults = {
                'items': items,
                showTitle: true,
                dosearch: true

            }
            //  console.log('Retrieved items after searching!',searchResults);

            req.searchResults = searchResults;
            return next();
            // res.render(req.body.page, {
            //     'items': items,
            //     showTitle: true,
            //     dosearch: true
            // });
        }
    });

}

router.get("/user", isAuthenticated, function(req, res) {
    loadUserProfile(req, res);
});

router.post("/signup", function(req, res) {
    console.log(`Starting signup process : }`);
    let totalCal = 1200;
    if (req.body.gender === "Male") {
        totalCal = 10 * (req.body.weight * 0.453592) + 6.25 * (req.body.height * 2.54) - 5 * 9 + 5
    } else {
        totalCal = 10 * (req.body.weight * 0.453592) + 6.25 * (req.body.height * 2.54) - 5 * 9 - 161.
    }
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        age: req.body.age,
        activityLevel: req.body.activityLevel,
        totalCalories: totalCal

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


router.post("/searchfood", searchFood, loadUserProfile);

router.post("/addFood", (req, res) => {

    console.log(req.session);
    console.log("adding food", req.body);
    let activity = {
        food: req.body.food,
        quantity: req.body.quantity,
        UserId: req.session.passport.user.id,
        calories: req.body.calories
    };
    console.log(activity);

    db.Activity.create(activity, {
        raw: true
    }).then(function() {

            res.redirect("/user");


        }

    );
});

/*Function to logout clearing the user from session*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
