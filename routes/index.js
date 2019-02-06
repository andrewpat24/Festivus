const express = require('express');
const router = express.Router();
const festivals = require('../db/helperFunctions/festivals');


/* GET home page. */
router.get('/', function(req, res, next){
  
  try {
    console.log( "User ID:", req.user.id );
  } catch (e) {
    console.log( "Error:", e );
  }
  console.log(req.isAuthenticated());
  
  res.render('index', { title: 'Home' });
});

// GET account page (WIP)
router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account.html', { user: req.user });
});

router.get('/logout', function(req, res){
  req.logout();
  req.redirect('/')
});

router.get('/festival/:festivalID', function(req, res, next) {
  var id = req.params.festivalID; 

  var festival = festivals.retrieveFestivalByID(id)
    .then(function (returnedFestival) {
      var festivalLineup = (function(festivalID) {
        // console.log('festivalObj ' + returnedFestival.id);
        return [
          {
            artistName: "David Guetta",
            artistId:1,
            artistProfilePicture: "https://i.scdn.co/image/f65af663cd7c12c4adb4e9029767537f2bb50ad1",
            artistFollowers: 2345342, 
            genre: "EDM"
          },
          {
            artistName: "Zhu",
            artistId:2,
            artistProfilePicture: "https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7",
            artistFollowers: 2345234, 
            genre: "EDM"
          },
          {
            artistName: "Mt Eden",
            artistId:3,
            artistProfilePicture: "https://i.scdn.co/image/6f0354b3d536679363bfa891f975fa9b2683666f",
            artistFollowers: 2345, 
            genre: "EDM"
          },
          {
            artistName: "Bassnectar",
            artistId:4,
            artistProfilePicture: "https://i.scdn.co/image/b2d54418b81eea1a53663d8c9b63336a9991a50e",
            artistFollowers: 234523, 
            genre: "EDM"
          }
        ];
      })(returnedFestival.id);  
      console.info(festivalLineup);
      res.render('festival', {
        festivalId: returnedFestival.id,
        festivalName: returnedFestival.name,
        // festivalProfilePicture: returnedFestival.logo,
        festivalProfilePicture:'https://www.sfoutsidelands.com/uploads/ol18-outside-lands-logo-2018-large.png',
        festivalBio: returnedFestival.bio, 
        festivalURL: returnedFestival.show_url,
        festivalLineup: festivalLineup
      });

  })
  .catch((err) => {
    console.log(err); 
    // TODO 
    res.render('festival', {
      festivalName: returnedFestival.name,
      festivalProfilePicture: returnedFestival.logo,
      festivalBio: returnedFestival.bio, 
      festivalURL: returnedFestival.show_url,
      festivalLineup: festivalLineup
    });

  });
});

// Simple route middleware to ensure user is authenticated to be used on pages that need to ensure authentication
/* If the request is authenticated (typically via a persistent login session), the request will proceed.
   Otherwise the user will be redirected to the index page.
*/
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
} 

router.get('/artist/:artistId', function (req,res, next) {
  // var id = request.params.festivalID; 
  var artistAlbums = [
    'https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7',
    'https://i.scdn.co/image/c7ed683d8e7d2207a052d3432993c358f6cb050c',
    'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
  ]
  res.render('artist', {
    artistName: 'Zhu',
    artistId: 1,
    artistProfile: 'https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7',
    artistBio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac vestibulum ante, eget tristique massa. Nullam commodo est nisl, a scelerisque dolor egestas quis. Curabitur commodo dolor ut interdum pellentesque. Duis cursus nisi quis tellus pulvinar, fermentum porttitor purus vestibulum. Duis sollicitudin, ante eget luctus rhoncus, felis arcu pretium enim, vel facilisis tellus nulla id nisl. Duis pharetra aliquet lobortis. Sed ut pretium tortor. Aenean aliquam ligula purus, nec porta tortor pellentesque maximus. Vestibulum interdum scelerisque tincidunt. Etiam id orci ac tortor commodo placerat nec in quam. Duis a erat sed felis placerat euismod. Morbi commodo aliquam ornare. Nulla pulvinar, orci sed gravida mattis, quam ipsum pharetra ipsum, et tempor sapien diam vitae odio. Proin sit amet nulla ac nulla lobortis luctus eget id eros. Morbi venenatis, est sit amet vulputate convallis, lacus ex euismod ante, ac ultrices ligula massa sed massa.',
    relatedArtists: [
      {
        relatedArtistName: 'Hayden James',
        relatedArtistPicture:  'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
      },
      {
        relatedArtistName: 'Autograf',
        relatedArtistPicture:  'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
      },
      {
        relatedArtistName: 'Lane 8',
        relatedArtistPicture:  'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
      },
      {
        relatedArtistName: 'Jerry Folk',
        relatedArtistPicture:  'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
      }
    ],
    artistMedia: [
      'https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7',
      'https://i.scdn.co/image/c7ed683d8e7d2207a052d3432993c358f6cb050c',
      'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
    ]

  });
})

module.exports = router;
