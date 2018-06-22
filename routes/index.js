var express = require('express');
var router = express.Router();

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/search', function(req, res, next) {
  res.render('search', {title: 'Search'});
})


module.exports = router;
