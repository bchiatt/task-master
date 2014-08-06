/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var high;
describe('Priority', function(){
  before(function(done){
    dbConnect('taskmaster', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      high = new Priority({name: 'high', color: 'red', value: '1'});
      high.insert(function(){
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should have a new priority', function(){
      expect(high).to.be.instanceof(Priority);
      expect(high.name).to.equal('high');
      expect(high.color).to.equal('red');
      expect(high.value).to.equal(1);
    });
  });

  describe('#insert', function(){
     it('should insert a priority to the database', function(done){
      high.insert(function(){
        expect(high._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should return all priorties', function(done){
      Priority.all(function(priorities){
        expect(priorities).to.have.length(1);
        expect(priorities[0].name).to.equal('high');
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a priority by its id', function(done){
      Priority.findById(high._id.toString(), function(priority){
        expect(priority.name).to.equal('high');
        done();
      });
    });
  });
});
