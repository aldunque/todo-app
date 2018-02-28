'use strict';
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var router = express.Router();
// Connect to mongoDB database
// const mongoURL = 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<database-name>';
// const mongoURL = 'mongodb://localhost/todo';
const mongoURL = process.env.MONGOLAB_URI;

mongoose.Promise = global.Promise;
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
  
    // do some work here with the database.
  
    //Close connection
    db.close();
}

var Todo = mongoose.model('Todo', {
    text: String
});

router.get('/todo', function(req, res) {
    // get todo from db
    // console.log("req.body", req.body);
    Todo.find(function(err, todos) {
        if (err) return res.send(err);
        console.log('your data is: ', todos);
        res.json(todos);
    });
});

router.post('/todo', function(req, res) {
    // create todo
    // console.log("req body in post todo: ", req.body);
    console.log("req.body: ", req.body);
    if (req.body.text == undefined || req.body.text == null) return alert("Write something!");
    Todo.create({
        text: req.body.text,
        done : false
    }, function(err, data) {
        if (err) return res.send(err);
        console.log('your data was saved');
        // get todo from db
        Todo.find(function(err, todoData) {
            if (err) return res.send(err);
            console.log('your data is: ', todoData);
            res.json(todoData);
        });
    });
});

router.delete('/todo/:todo_id', function(req, res) {
    Todo.deleteOne({

    }, function(err) {
        if (err) return res.send(err);

        // get todo from db
        Todo.find(function(err, todoData) {
            if (err) return res.send(err);
            console.log('your data is: ', todoData);
            res.json(todoData);
        });
    });
});

module.exports = router; 