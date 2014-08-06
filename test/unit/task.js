/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
//var Priority = require('../../app/models/priority');
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var task;

describe('Task', function(){
  before(function(done){
    dbConnect('taskmaster', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      var o = {name: 'wrap presents', due: '12/24/14', photo: 'http://cutekittens.com/1.jpg', tags: 'home, work, play', priorityId: 'av3'};
      task = new Task(o);
      task.insert(function(){
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should create a new task', function(){
      expect(task).to.be.instanceof(Task);
      expect(task.name).to.equal('wrap presents');
      expect(task.due).to.equal('Dec 24th 14');
      expect(task.photo).to.equal('http://cutekittens.com/1.jpg');
      expect(task.tags[1]).to.equal('work');
      expect(task.priorityId).to.equal('av3');
      expect(task.isComplete).to.be.false;
    });
  });

  describe('#insert', function(){
     it('should insert a task to the database', function(done){
      task.insert(function(){
        expect(task._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should return all tasks', function(done){
      Task.all(function(tasks){
        expect(tasks).to.have.length(1);
        expect(tasks[0].name).to.equal('wrap presents');
        done();
      });
    });
  });
  describe('.all', function(){
    it('should return all tasks', function(done){
      Task.all(function(tasks){
        expect(tasks).to.have.length(1);
        expect(tasks[0].name).to.equal('wrap presents');
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a task by its id', function(done){
      Task.findById(task._id, function(task){
        expect(task.name).to.equal('wrap presents');
        done();
      });
    });
  });
  describe('.isComplete', function(){
    it('should set item as complete or not', function(done){
      var o = {id: task._id.toString(), complete: true};
      Task.isComplete(o, function(){
        Task.findById(task._id.toString(), function(task){
          expect(task.isComplete).to.be.true;
          expect(task.name).to.equal('wrap presents');
          done();
        });
      });
    });
  });
});
