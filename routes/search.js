var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');

router.get('/', function(req, res, next) {
  console.log('I AM IN THE GET REQUEST PLEASE SAVE MEEEE!!!!!');
  festivals.retrieveAllFestivals()
    .then((results) => {
      console.log(JSON.stringify(results));
      
      res.render('search', {
        searchResults: results,
        title: 'Festivus'
      });
        
    })
    .catch((err) => {
      console.log(err)
      res.render('search', {
        searchResults: undefined,
        title: 'Festivus'
      });
    }); 

});

router.post('/', function(req, res, next) {
  const searchQuery = req.body.searchQuery;
  console.log(req.body);

  festivals.searchLikeFestivals(searchQuery)
    .then((results) => {
      // console.log(JSON.stringify(results));
      
      res.render('search', {
        title: 'Search',
        searchResults: results
      });

    })
    .catch((err) => {
      console.log(err)
      res.render('search', {
        title: 'Search',
        searchResults: undefined
      });
    });

  
});

module.exports = router;

