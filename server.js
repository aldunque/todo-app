
const express = require('express');
const bodyParser = require('body-parser');
const env = require('node-env-file');
const morgan = require('morgan');
const app = express();

env(__dirname + '/.env');
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

// Routing handler
var handler = require('./routes/app');
app.use('/', handler);

// Configure port
const port = process.env.PORT || 8080;

// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);