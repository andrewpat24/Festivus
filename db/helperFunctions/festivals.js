const connection = require('../db');
const db = require('../db');
const pgp = require('pg-promise')(); 

let festivals = {}; 


// TODO: Remake this thing forsure
//id | name | show_url | full_location | city | state_region | lat_long | date_span | bio | logo | genre | twitter_url | insta_url | facebook_url | view_count | follower_count | createdAt | updatedAt 


festivals.addFestival = (festivalObj) => {
    let currentDateTime = new Date(); 
    festivalObj["createdAt"] = currentDateTime; 
    festivalObj["updatedAt"] = currentDateTime; 
    console.log(festivalObj);
    return db.query( 'INSERT INTO "festivals"(name,show_url,full_location,city,state_region,lat_long,date_span,bio,logo,genre,twitter_url,insta_url,facebook_url,view_count,follower_count,"createdAt","updatedAt") VALUES(${name},${show_url},${full_location},${city},${state_region},${lat_long},${date_span},${bio},${logo},${genre},${twitter_url},${insta_url},${facebook_url},${view_count},${follower_count},${createdAt},${updatedAt}) RETURNING id',
    {
        name: festivalObj.name, 
        show_url: festivalObj.show_url, 
        full_location: festivalObj.full_location, 
        city: festivalObj.city, 
        state_region: festivalObj.state_region, 
        lat_long:festivalObj.lat_long, 
        date_span:festivalObj.date_span, 
        bio:festivalObj.bio, 
        logo:festivalObj.logo, 
        genre:festivalObj.genre, 
        twitter_url:festivalObj.twitter_url, 
        insta_url:festivalObj.insta_url, 
        facebook_url:festivalObj.facebook_url, 
        view_count:festivalObj.view_count, 
        follower_count:festivalObj.follower_count, 
        createdAt:festivalObj.createdAt, 
        updatedAt:festivalObj.updatedAt
    }
    );
}

// EXAMPLE 
// let festivalObj = {
//     name: "name",
//     show_url:"url",
//     city:"city",
//     full_location: "full_location",
//     state_region:"state_region",
//     lat_long:"lat_long",
//     date_span:"date_span",
//     bio:"bio",
//     logo:"logo",
//     genre:"genre",
//     twitter_url:"twitter_url",
//     insta_url:"insta_url",
//     facebook_url:"facebook_url",
//     view_count:0,
//     follower_count: 0
//   }
  
//   festivals.addFestival(festivalObj)
//     .then((res) => {
//       console.log("added festival", res);
//     })
//     .catch((err) => {
//         console.log("Could not add festival", err);
//     })

///////////////////////////////////////

festivals.removeFestival = (festival_id) => {
    return db.query('DELETE FROM "festivals" WHERE id = $1 RETURNING id', [festival_id])
}

// festivals.removeFestival(1)
//   .then((res) => {
//     console.log("festival deleted", res);
//   });

///////////////////////////////////////

festivals.retrieveFestivalByID = (festival_id) => {
    return db.one('SELECT * FROM "festivals" WHERE id = $1', [festival_id]);
}

// festivals.retrieveFestivalByID(2)
// .then((res) => {
//   console.log(res);
// })
///////////////////////////////////////

festivals.retrieveFestivalByName = (festival_name) => {
    return db.one('SELECT * FROM "festivals" WHERE name = $1', [festival_name])
}

// festivals.retrieveFestivalByID('outside lands')
// .then((res) => {
//   console.log(res);
// })
///////////////////////////////////////

// Todo: test this thing
festivals.findFestivalByField = (field_name, value) => {
    return db.one('SELECT * FROM "festivals" WHERE ${field_name} = ${value}', {
        field_name: field_name, 
        value: value 
    });
}

//id | name | show_url | full_location | city | state_region | lat_long | date_span | bio | logo | genre | twitter_url | insta_url | facebook_url | view_count | follower_count | createdAt | updatedAt 

festivals.searchLikeFestivals = (query) => {
    query = "%" + query + "%";
    return db.many(`SELECT * FROM festivals WHERE 
    name ILIKE '${query}'
    OR genre ILIKE '${query}'`);
}

///////////////////////////////////////


festivals.retrieveAllFestivals = () => {
    return db.many('SELECT * FROM festivals');
}

// festivals.retrieveAllFestivals()
//   .then((res) => {
//     console.log(res);
//   })
///////////////////////////////////////


module.exports = festivals; 
// const festivals = require('./db/helperFunctions/festivals');
