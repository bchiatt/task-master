'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Priority(o){
  this.name = o.name;
  this.color = o.color;
  this.value = o.value * 1;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){
    return global.mongodb.collection('priorities');
  }
});

Priority.prototype.insert = function(cb){
  Priority.collection.insert(this, cb);
};

Priority.all = function(cb){
  Priority.collection.find({}).toArray(function(err, object){
    var priority = object.map(function(o){
      return changeProto(o);
    });
    cb(priority);
  });
};

Priority.findById = function(query, cb){
  query = Mongo.ObjectID(query);
  Priority.collection.findOne({_id: query}, function(err, object){
    var priority = changeProto(object);
    cb(priority);
  });
};

//Private Helper Functions
function changeProto(obj){
  var priority = _.create(Priority.prototype, obj);

  return priority;
}

module.exports = Priority;
