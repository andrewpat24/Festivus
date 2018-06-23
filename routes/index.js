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

router.get('/festival', function(req, res, next) {
  // var id = request.params.festivalID; 

  var festivalLinup = (function() {
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
  })();  

  res.render('festival', {
    festivalName: 'Outside Lands',
    festivalProfilePicture: 'https://www.sfoutsidelands.com/uploads/ol18-outside-lands-logo-2018-large.png',
    festivalBio: `
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac vestibulum ante, eget tristique massa. Nullam commodo est nisl, a scelerisque dolor egestas quis. Curabitur commodo dolor ut interdum pellentesque. Duis cursus nisi quis tellus pulvinar, fermentum porttitor purus vestibulum. Duis sollicitudin, ante eget luctus rhoncus, felis arcu pretium enim, vel facilisis tellus nulla id nisl. Duis pharetra aliquet lobortis. Sed ut pretium tortor. Aenean aliquam ligula purus, nec porta tortor pellentesque maximus. Vestibulum interdum scelerisque tincidunt. Etiam id orci ac tortor commodo placerat nec in quam. Duis a erat sed felis placerat euismod. Morbi commodo aliquam ornare. Nulla pulvinar, orci sed gravida mattis, quam ipsum pharetra ipsum, et tempor sapien diam vitae odio. Proin sit amet nulla ac nulla lobortis luctus eget id eros. Morbi venenatis, est sit amet vulputate convallis, lacus ex euismod ante, ac ultrices ligula massa sed massa.

    Pellentesque tristique lectus id metus malesuada bibendum. Nunc id sem neque. Integer suscipit metus nunc, non vestibulum ligula tempus vel. Maecenas elementum aliquam odio a dignissim. Mauris rhoncus vehicula interdum. In posuere consectetur lorem, in dapibus leo hendrerit vel. Integer dolor lorem, feugiat ut rhoncus at, iaculis sit amet neque. Suspendisse at urna quis turpis faucibus mattis. Sed id ipsum id erat scelerisque mattis sit amet quis erat. Aliquam vitae suscipit enim. In cursus tristique ligula, vitae semper est mattis ut. Duis turpis turpis, malesuada at varius at, consectetur nec neque. Sed enim mauris, sagittis ac convallis sed, lobortis non arcu. Aenean ex nisl, aliquet mollis metus a, sodales vulputate diam. In efficitur dui sit amet ante venenatis imperdiet.

    Praesent efficitur posuere gravida. Donec porttitor in nunc ut feugiat. Quisque id diam ut ante accumsan placerat. Cras rutrum purus at rhoncus iaculis. Nam purus orci, rutrum id ultricies porta, sagittis sed elit. Maecenas ut condimentum elit. Aliquam et quam quis sapien mattis facilisis. Mauris dui orci, egestas sit amet luctus quis, pretium ut turpis.
    `, 
    festivalMedia: [
      'https://s.hdnux.com/photos/50/67/22/10712255/3/1024x1024.jpg',
      'https://consequenceofsound.files.wordpress.com/2017/08/ol17-social-share.jpg?quality=80&w=807',
      'http://www.sfcritic.com/wp-content/uploads/2014/08/Screen-Shot-2014-08-07-at-1.17.04-PM.png',
      'http://silencenogood.net/wordpress/wp-content/uploads/2013/08/Outside-Lands-2013.jpg'
    ],
    festivalLineup: festivalLinup
  });
});

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
