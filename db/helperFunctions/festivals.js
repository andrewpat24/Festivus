const connection = require('../db');
const db = require('../db');
const pgp = require('pg-promise')(); 

let festivals = {}; 

festivals.addFestival = (festivalObj) => {
    let currentDateTime = new Date();
    festivalObj["createdAt"] = currentDateTime;
    festivalObj["updatedAt"] = currentDateTime; 

    return db.query( 'INSERT INTO "festivals"(name,show_url,location,date_span,bio,logo,"createdAt","updatedAt") VALUES(${name},${show_url},${location},${date_span},${bio},${logo},${createdAt},${updatedAt})' , {
        name:festivalObj.name, 
        show_url:festivalObj.show_url, 
        location:festivalObj.location, 
        date_span:festivalObj.date_span, 
        bio:festivalObj.bio, 
        logo:festivalObj.logo, 
        createdAt:festivalObj.createdAt, 
        updatedAt:festivalObj.updatedAt
    });
}




module.exports = festivals; 