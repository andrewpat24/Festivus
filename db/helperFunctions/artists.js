const db = require('../db');
const pgp = require('pg-promise')(); 

let artists  = {}; 

artists.addArtist = (artistObj) => {
    let currentDateTime = new Date(); 
    artistObj["createdAt"] = currentDateTime; 
    artistObj["updatedAt"] = currentDateTime; 

    return db.query('INSERT INTO "artists"(name,spotify_profile,festival_id,showtime,profile_picture,"createdAt","updatedAt") VALUES(${name},${spotify_profile},${festival_id},${showtime},${profile_picture},${createdAt},${updatedAt}) RETURNING id',
        {
            name:artistObj.name, 
            spotify_profile:artistObj.spotify_profile,
            showtime:artistObj.showtime, 
            profile_picture:artistObj.profile_picture,
            festival_id:artistObj.festival_id,
            createdAt: artistObj.createdAt,
            updatedAt: artistObj.updatedAt
        });
};

// const artists = require('./db/helperFunctions/artists')
// const newArtist = {
//   name:'name',
//   spotify_profile: 'spotify profile',
//   showtime: 'showtime',
//   bio: 'bio'
//   profile_picture: 'profile picture',
//   festival_id:2
// }
//////////////////////////////////////////

artists.removeArtist = (artist_id) => {
    return db.query(' DELETE FROM "artists" WHERE id = ${id} RETURNING id;', {
       id: artist_id
    });
}

  // artist.removeArtist(2)
  //   .then((res) => {
  //     console.log("Removed Artist id: ", res)
  //   });
//////////////////////////////////////////

artists.findArtistByFestival = (festival_id) => {
    return db.many('SELECT * FROM "artists" WHERE festival_id = ${festival_id}', {
        festival_id: festival_id
    });
}

  // artist.findArtistByFestival(1)
  //   .then( (res) => {
  //     console.log("artists: ", res)
  //   });
/////////////////////////////////////

artists.retrieveArtist = (artist_id) => {
    return db.one('SELECT * FROM "artists" WHERE id = ${id}', {
        id: artist_id
    });
}

  // artists.retrieveArtist(8)
  //   .then((res) => {
  //     console.log("artist:", res);
  //   });
/////////////////////////////////////

module.exports = artists; 
// const artists = require('./db/helperFunctions/artists');




