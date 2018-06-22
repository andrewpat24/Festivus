var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;



// router.get('/getAllFestivals', function(req, res, next) {

//     festivals.retrieveAllFestivals()
//       .then((responseObject) => {
//         res.render('index', {
//           responseObject: responseObject,
//           title: 'Festivus'
//         })
//       }); 
  
//   });
  
//   router.get('/getArtistsFromFestival', function(req,res,next) {
  
//     festivals.retrieveFestivalByID(2)
//       .then((festival) => {
//         artists.findArtistByFestival(2)
//         .then((responseObject) => {
//           res.render('index', {
//             responseObject: responseObject,
//             title: festival.name
//           })
//         })
//       });
    
//   });
