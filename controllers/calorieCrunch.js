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

router.post("/verifyLogin",passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
console.log("verifyLogin");
// res.render("members", "");
res.render("user", {
            'name': req.body.name
        });
});
// Direct to Login page
// router.post("/verifyLogin", (req, res) => passport.authenticate('local', {
// successRedirect: '/',
// failureRedirect: '/login',
// })(req, res));


router.post("/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        console.log("signup complete");
        res.render("user", {
            'name': req.body.name
        });

    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/searchfood", function(req, res) {


    let items = req.body.foodsearch
    let appID = "48e9aea9";
    let appKey = "3cfd31e974a75dc9c2b9cc64a1b40dd6";

    request("https://api.nutritionix.com/v1_1/search/"+items+"?results=0:20&fields=item_name,nf_servings_per_container,nf_saturated_fat,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_size_qty,nf_total_fat,brand_name,item_id,nf_calories&appId="+appID+"&appKey="+appKey, function(error, response, body) {

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

// // get route, edited to match sequelize
// router.get("/burgers", function(req, res) {
//   // replace old function with sequelize function
//   db.Burger.findAll({
//     include: [db.Customer],
//     // Here we specify we want to return our burgers in ordered by ascending burger_name
//     order: [
//       ["burger_name", "ASC"]
//     ]
//   })
//   // use promise method to pass the burgers...
//   .then(function(dbBurger) {
//     // into the main index, updating the page
//     var hbsObject = {
//       burger: dbBurger
//     };
//     return res.render("index", hbsObject);
//   });
// });
//
// // post route to create burgers
// router.post("/burgers/create", function(req, res) {
//   // edited burger create to add in a burger_name
//   db.Burger.create({
//     burger_name: req.body.burger_name
//   })
//   // pass the result of our call
//   .then(function(dbBurger) {
//     // log the result to our terminal/bash window
//     console.log(dbBurger);
//     // redirect
//     res.redirect("/");
//   });
// });
//
// // put route to devour a burger
// router.put("/burgers/update", function(req, res) {
//   // If we are given a customer, create the customer and give them this devoured burger
//   if (req.body.customer) {
//     db.Customer.create({
//       customer: req.body.customer,
//       BurgerId: req.body.burger_id
//     })
//     .then(function(dbCustomer) {
//       return db.Burger.update({
//         devoured: true
//       }, {
//         where: {
//           id: req.body.burger_id
//         }
//       });
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
//   // If we aren't given a customer, just update the burger to be devoured
//   else {
//     db.Burger.update({
//       devoured: true
//     }, {
//       where: {
//         id: req.body.burger_id
//       }
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
// });

module.exports = router;