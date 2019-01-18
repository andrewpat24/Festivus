var express = require('express');
var router = express.Router();
const users = require("../db/helperFunctions/users");

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
    console.log(req.body.username); 
    console.log(req.body.password); 
    console.log(req.body.email); 
    let userObj = {
        username: req.body.username, 
        password: req.body.password, 
        email: req.body.email
    }

    users.addUser(userObj).then( (res) => {
        console.log("user: ", res);
    }).catch( (e) => {
        console.log("err:", e.detail)
    });

    res.render('login', {title: 'Home'});
})

module.exports = router; 