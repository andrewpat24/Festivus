## SETUP PROCEDURE

###Setup postgres on your computer. 
OSX: https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
Linux: https://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/

###Create DB

Connect to psql db from your terminal.
> psql postgres

Create the database.
> CREATE DATABASE festivus;

Exit from the database. 
> \quit

Clone repository in your desired directory. 
> git clone https://github.com/andrewpat24/Festivus.git

Setup NPM on
https://www.npmjs.com/get-npm

Download dependencies
> npm i

Migrate the database model into postgres (this command must be run while terminal path is inside project)
> sequelize db:migrate