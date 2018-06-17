// const Sequelize = require('sequelize');

// const db = {};

// db.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// db.testConnection = () => {
//   db.connection
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// }

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
