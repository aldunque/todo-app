'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
// Connect to mongoDB database
// const mongoURL = 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<database-name>';
const mongoURL = 'mongodb://localhost/todo';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

var Todo = mongoose.model('Todo', {
    text: String
});

router.get('/', function(req, res) {
    res.send('Sample');
});

router.get('/todo', function(req, res) {
    // get todo from db
    Todo.find(function(err, todoData) {
        if (err) return res.send(err);
        res.json(todoData);
    });
});

module.exports = router; 