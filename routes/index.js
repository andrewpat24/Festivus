var express = require('express');
var router = express.Router();

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// TODO: implement dynamic functions for this code. 
router.get('/festival/:festivalID', function(req, res, next) {
  var id = req.params.festivalID; 

  var festival = festivals.retrieveFestivalByID(id)
    .then(function (returnedFestival) {
      var festivalLinup = (function(festivalID) {
        console.log('festivalObj ' + returnedFestival.id);
        return [
          {
            artistName: "David Guetta",
            artistProfilePicture: "https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7",
            artistFollowers: 2345342, 
            genre: "EDM"
          },
          {
            artistName: "Zhu",
            artistProfilePicture: "https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7",
            artistFollowers: 2345234, 
            genre: "EDM"
          },
          {
            artistName: "Mt Eden",
            artistProfilePicture: "https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7",
            artistFollowers: 2345, 
            genre: "EDM"
          },
          {
            artistName: "Bassnectar",
            artistProfilePicture: "https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7",
            artistFollowers: 234523, 
            genre: "EDM"
          }
        ]
      })(returnedFestival.id);  
    
    res.render('festival', {
      festivalName: returnedFestival.name,
      festivalProfilePicture: returnedFestival.logo,
      festivalBio: returnedFestival.bio, 
      festivalURL: returnedFestival.show_url,
      festivalLineup: festivalLinup
    });
  });
});


// TODO: implement dynamic functions for this code. 
router.get('/artist', function (req,res, next) {
  // var id = request.params.festivalID; 
  var artistAlbums = [
    'https://i.scdn.co/image/62225a86b462fca0a9f6a698fa6e4583f25bc0b7',
    'https://i.scdn.co/image/c7ed683d8e7d2207a052d3432993c358f6cb050c',
    'https://i.scdn.co/image/ce0fc50281a2917296bf1d8146157c1612a957ee'
  ]
  res.render('artist', {
    artistName: 'Zhu',
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
