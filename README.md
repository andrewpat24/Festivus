## SETUP PROCEDURE

### Setup postgres on your computer. 

OSX: https://launchschool.com/blog/how-to-install-postgresql-on-a-mac

Linux: https://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/

### Create DB

Connect to psql db from your terminal.

> psql postgres

Create the database.

> CREATE DATABASE festivus;

Exit from the database. 

> \quit

Clone repository in your desired directory. 

> git clone https://github.com/andrewpat24/Festivus.git

Setup NPM 

https://www.npmjs.com/get-npm

Download dependencies

> npm i

Migrate the database model into postgres (this command must be run while terminal path is inside project)

> sequelize db:migrate

Copy .env-example and rename it to .env

Only DB_URL is in use, so just make that one by changing the username and password text. 

## How the fuck does this all work? 

Take a look in package.json, 'npm start' runs a script which kicks off bin/www. 

Our app.js then builds the rest of our project by specifying our routes. 

Express application walkthrough: 
https://gist.github.com/mdang/0a8e00883b2e25424e05

What are routes? 
https://expressjs.com/en/guide/routing.html

Let's go through our directories top to bottom: 
#### bin
* contains www which kicks off our app and gets our server running. If there're any issues with port number or specific server issues, look in here. 

#### db 
* This directory contains helper functions for psql. db.js creates our initial connection to the db which we reference in our helper functions. 

#### node_modules
* NPM is the node package manager, which installs packages locally into a project, specifically, into the node_modules folder.

#### public
* Where all of our client side shit gets loaded like javascript, css, style libraries, etc. 

#### public - libraries 
* Currently using [uikit](https://getuikit.com/docs/introduction).
* Still need to add jQuery, but hbs should be doing the majority of our logic. 

#### routes
* routes get used so our server knows what data to serve the user depending on the url. You can have multiple types of routes depending on GET/POST/PUT/DELETE/etc requests from the user. For example, you can make a post route on /deleteUserWithID:[id] to pass an id with the url parameter to delete that user. 

#### server
* this directory was automatically generated by sequelize. I don't know why the fuck they chose to automatically generate it if I don't have a server directory but whatever

#### server - migrations + server - models
* This allows us to automatically generate our tables when running sequelize db:migrate. 

#### views
* Contains all of our frontend templates for handlebars. The files get served up in our routes.
* layout.hbs gets built on every single page. That way things like headers, navbars, footers, etc can be placed on every page without us doing anything. 
* if you want to add any components directory, put it in here. 

#### .env (and .env-example)
* Contains all of our sensitive information like usernames, passwords, api keys, etc so it can be abstracted and not put up into github. 

#### package.json
* The scripts key is where you can check to see what scripts are available or where you can make new scripts for our project, so you don't have to write the whole thing out. 



