'use strict';

var Priority = require('../models/priority');
var Task = require('../models/task');

exports.init = function(req, res){
  Priority.all(function(priorities){
  res.render('tasks/init', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.insert(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  Task.all(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

exports.complete = function(req, res){
  //Task.completed(req.body);
  res.redirect('/tasks'); 
};
