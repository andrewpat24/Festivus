const pgp = require('pg-promise')(); 
const db = pgp(process.env.DB_URL); 

db.connect().then(function (obj) {
  console.log("Connection to postgres db successful!")
  obj.done(); // success, release connection;
}).catch(function (error) {
  console.log("ERROR:", error.message);
});

module.exports = db; 


// sequelize model:generate --name festivals --attributes name:string,show_url:string,full_location:string,city:string,state_region:string,lat_long:string,date_span:string,bio:string,logo:string,genre:string,twitter_url:string,insta_url:string,facebook_url:string,view_count:integer,follower_count:integer
// sequelize model:generate --name lineups --attributes artist_id:integer,festival_id:integer,showtime:string
// sequelize model:generate --name artists --attributes name:string,spotify_profile:string,profile_picture:string,bio:string,genre:string,wiki_url:string,insta_url:string,facebook_url:string,twitter_url:string,view_count:integer,follower_count:integer
// sequelize model:generate --name showtimes --attributes festival_id:integer,artist_id:integer,showtime_span:string