const db = require('../db');
const pgp = require('pg-promise')(); 

const festivals = require('./festivals');
const artists = require('./artists');

let search = {}; 

// Todo: populate the database 

// todo: function - find festival or artist given query
search.searchFestivalOrArtist = (query) => {
    resultCollection = []; 
    festivals.searchLikeFestivals(query) 
        .then( (festivalsResult) => {
            resultCollection += festivalsResult; 
            artists.searchLikeArtists(query)
                .then((artistsResult) => {
                    resultCollection += artistsResult
                    return resultCollection; 
                });
        }); 
}
// todo: tokenize search string and place highest occurrence at front
search.tokenizedSearchQuery = (query) => {
    searchArray = query.split(' ');
    searchArray.array.forEach(element => {
        
    });

}

// todo: function - order results in query

// todo: function - combine find and order festival functions (be it through priority based on date or other ways) - return array of id's




module.exports = search; 