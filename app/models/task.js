'use strict';
var moment = require('moment');
var Mongo = require('mongodb');
var _     = require('lodash');
var Priority = require('./priority');
var async = require('async');

function Task(x){
  this.name = x.name;
  this.due = moment(x.due).format('MMM Do YY');
  this.photo = x.photo;
  this.tags = x.tags.split(', ');
  this.priorityId = x.priorityId;
  this.isComplete = false;
}

Object.defineProperty(Task, 'collection', {
  get: function(){
    return global.mongodb.collection('tasks');
  }
});


Task.prototype.insert = function(cb){
  Task.collection.insert(this, cb);
};

Task.all = function(cb, filter, page){
  

  //add .limit().skip()
  Task.collection.find().toArray(function(err, object){
    var tasks = object.map(function(x){
      return changeProto(x);
    });

    async.map(tasks, function(task, done){
      Priority.findById(task.priorityId, function(priority){
        task.priority = priority;
        done(null, task);
      });
    },function(err, mappedTasks){
        cb(mappedTasks);
    });
  });
};

Task.findById = function(query, cb){
  query = Mongo.ObjectID(query);
  Task.collection.findOne({_id: query}, function(err, object){
    var task = changeProto(object);
    cb(task);
  });
};

Task.completed = function(task){
  Task.collection.update({_id:task.id}, {$set:{isComplete: task.complete}});
};


//Private Helper Functions!!

function changeProto(obj){
  var task = _.create(Task.prototype, obj);

  return task;
}
module.exports = Task;
