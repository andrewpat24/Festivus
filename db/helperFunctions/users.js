const db = require('../db');
const pgp = require('pg-promise')(); 

let users = {}; 


users.addUser = (userObj) => {
    let currentDateTime = new Date(); 
    userObj["createdAt"] = currentDateTime; 
    userObj["updatedAt"] = currentDateTime; 

    return db.query('INSERT INTO "users"(username,email,password,"createdAt","updatedAt") VALUES(${username},${email},${password},${createdAt},${updatedAt})', 
        {
            username: userObj.username, 
            email:userObj.email,
            password:userObj.password,
            createdAt: userObj.createdAt,
            updatedAt: userObj.updatedAt
        });
}

users.getIDByUsername = (username) => {
    return db.one('SELECT id FROM "users" WHERE "username" = $1', [username]);
}

users.getOBJByUsername = (username) => {
    return db.one('SELECT * FROM "users" WHERE "username" = $1', [username]);
}

users.getByID = (id) => {
    return db.one('SELECT * FROM "users" WHERE id = $1', [id]);
}


module.exports = users; 