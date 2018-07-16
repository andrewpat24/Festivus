var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');

/* GET users listing. */
// router.get('/', function(req, res, next) {
  
// });

router.get('/', function(req, res, next) {
 

  festivals.retrieveAllFestivals()
  .then((results) => {
    res.render('search', {
      searchResults: results,
      title: 'Festivus'
    })
  }); 

})

router.get('/returnAllFestivals', function(req, res, next) {

    festivals.retrieveAllFestivals()
      .then((responseObject) => {
        res.render('index', {
          responseObject: responseObject,
          title: 'Festivus'
        })
      }); 
  
  });
  
  router.get('/getArtistsFromFestival', function(req,res,next) {
  
    festivals.retrieveFestivalByID(2)
      .then((festival) => {
        artists.findArtistByFestival(2)
        .then((responseObject) => {

          res.render('index', {
            responseObject: responseObject,
            title: festival.name
          })

        })
      });
    
  });

  router.post('/', function(req, res, next) {
    const searchQuery = req.body.searchQuery;
    console.log(req.body);

    festivals.searchLikeFestivals(searchQuery)
      .then((results) => {
        console.log(JSON.stringify(results));
        res.render('search', {
          title: 'Search',
          searchResults: results
        });

      });

    
  });

module.exports = router;