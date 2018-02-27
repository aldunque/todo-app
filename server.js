
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('node-env-file');

const app = express();

env(__dirname + '/.env');

// Connect to mongoDB database
// const mongoURL = 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<database-name>';
const mongoURL = 'mongodb://localhost/todo';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

// Routing handler
var handler = require('./routes/app');

app.use('/', handler);

// Configure port
const port = process.env.PORT || 8080;

// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);