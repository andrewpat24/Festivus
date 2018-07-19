const connection = require('../db');
const db = require('../db');
const pgp = require('pg-promise')(); 

let festivals = {}; 

festivals.addFestival = (festivalObj) => {
    let currentDateTime = new Date();
    festivalObj["createdAt"] = currentDateTime;
    festivalObj["updatedAt"] = currentDateTime; 

    return db.query( 'INSERT INTO "festivals"(name,show_url,location,date_span,bio,logo,"createdAt","updatedAt") VALUES(${name},${show_url},${location},${date_span},${bio},${logo},${createdAt},${updatedAt}) RETURNING id' , {
        name:festivalObj.name, 
        show_url:festivalObj.show_url, 
        location:festivalObj.location, 
        date_span:festivalObj.date_span, 
        genre: festivalObj.genre,
        bio:festivalObj.bio, 
        logo:festivalObj.logo, 
        createdAt:festivalObj.createdAt, 
        updatedAt:festivalObj.updatedAt
    });
}

// let festivalObj = {
//     name: "name",
//     show_url:"url",
//     location:"location",
//     date_span:"date span",
//     bio: "bio",
//     logo: "logo"
//   }
  
//   festivals.addFestival(festivalObj)
//     .then((res) => {
//       console.log("added festival", res);
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

//id |     name      | show_url     | location |  date_span   | bio    |        logo    | genre | createdAt  |   updatedAt
festivals.searchLikeFestivals = (query) => {
    query = "%" + query + "%";
    return db.many(`SELECT * FROM festivals WHERE 
    name ILIKE '${query}'
    OR location ILIKE '${query}'
    OR date_span ILIKE '${query}'
    OR genre ILIKE '${query}'`);
}

///////////////////////////////////////


festivals.retrieveAllFestivals = () => {
    return db.many('SELECT * FROM "festivals"');
}

// festivals.retrieveAllFestivals()
//   .then((res) => {
//     console.log(res);
//   })
///////////////////////////////////////


module.exports = festivals; 
// const festivals = require('./db/helperFunctions/festivals');
