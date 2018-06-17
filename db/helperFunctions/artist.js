const db = require('../db');
const pgp = require('pg-promise')(); 

let artist  = {}; 

artist.addArtist = (artistObj) => {
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

artist.removeArtist = (artistID) => {
    return db.query("", []);
}

artist.modifyArtist = () => {

}

artist.findArtistByFestival = (festival_id) => {

}

artist.retrieveArtist = () => {

}

module.exports = artist; 