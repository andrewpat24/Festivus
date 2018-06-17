var express = require('express');
var router = express.Router();

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAllFestivals', function(req, res, next) {

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
module.exports = router;
