const pgp = require('pg-promise')(); 

const db = pgp(process.env.DB_URL); 

db.connect().then(function (obj) {
  console.log("Connection to postgres db successful!")
  obj.done(); // success, release connection;
})
.catch(function (error) {
  console.log("ERROR:", error.message);
});

module.exports = db; 
