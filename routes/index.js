var express = require('express');
var router = express.Router();
var passport = require('passport');
var SpotifyWebApi = require('spotify-web-api-node');
var appKey = process.env.APP_KEY;
var appSecret = process.env.APP_SECRET;

const festivals = require('../db/helperFunctions/festivals');
const artists = require('../db/helperFunctions/artists');
const SpotifyStrategy = require('passport-spotify').Strategy;


// Passport session setup
/* To support persistent login sessions, Passport needs to be able to serialize users into and deserialize
users out of the session. This will be as simple as storing the user ID when serializing, and finding the user by
ID when deserializing. When we get a database hooked up, we need to serialize that only. For now, the entire spotify profile is 
serialized. */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Authentication strategy (WIP)
/* Strategies in passport require a 'verify' function, which accepts credentials (in this case, it takes
an accessToken, a refreshToken, expires_in, and a spotify profile), and invokes a callback with the user object
*/
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: "http://localhost:3000/auth/spotify/callback"
},
function(accessToken, refreshToken, expires_in, profile, done) {
  // async verification wow cool
  process.nextTick(function () {
  /* User.findOrCreate({ spotifyID: profile.id}), function (err, user) {
    return done(err, user);
  }); */
  // The above code is how we'd want to do it once we get the database, again, but for now this just returns the whole 
  // spotify profile. with the database, we want to associate the spotify profile with a user record and return that.
    return done(null, profile);
   });
}));


/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Home' });
});

// GET auth page. (WIP)
router.get('/auth/spotify', 
    passport.authenticate(
      'spotify',
      {scope: ['user-top-read', 'user-read-email', 'user-read-private'], showDialog: true}
    ), 
    function(req, res, next){
    // The request will be rediredcted to spotify for authentication, so this function will not be called.
});

// GET auth callback page. (WIP)
router.get('/auth/spotify/callback', 
    passport.authenticate('spotify', { failureRedirect: '/index'}), 
    function(req, res, next){ 
      // Successful authentication, redirect home.
      res.redirect('/');
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
        ];
      })(returnedFestival.id);  
      console.info(festivalLineup);
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
