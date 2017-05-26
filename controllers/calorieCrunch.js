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