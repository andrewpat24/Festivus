var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');
const users = require("../db/helperFunctions/users");
const passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 14; 

router.get('/', function(req, res, next){
    res.render('index', { title: 'Home' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
    res.render('createAccount', {title: 'Register Account'});
})

router.post('/create-account', function(req, res, next) {

    req.checkBody("username", 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-40 characters long.').len(4, 40);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 5-100 characters long.').len(5, 100);
    req.checkBody('confirm-password', 'Passwords do not match, please try again.').equals(req.body.password);

    const errors = req.validationErrors(); 

    if(errors) {
        console.log(`errors: ${JSON.stringify(errors)}`);

        res.render('createAccount', {
            title: 'Register Account', 
            errors: errors, 
            email: req.body.email, 
            username: req.body.username
        });

    } else {

        let userObj = {
            username: req.body.username, 
            email: req.body.email
        }
    
        console.log(userObj);

        bcrypt.hash( req.body.password , saltRounds, (err, hash) => {

            userObj["password"] = hash; 

            users.addUser(userObj).then( (userObj) => {
                console.log("user: ", userObj);
                users.getIDByUsername(req.body.username).then( (userID) => {

                    req.login(userID, () => {
                        res.redirect('/');
                    });

                }).catch ( (e) => {

                    console.log("err getting id by username :", e.detail);
                    throw e; 
                })

            }).catch( (e) => {
                console.log("err adding user :", e.detail);
                throw e; 
            });

        });

        
    }
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    users.getByID(id).then( (userObject) => {
        console.log(userObject);
        done(null, userObject)
    } ).catch( (e) => {
        console.log(e)
    }) ;
});

module.exports = router; 