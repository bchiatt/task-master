'use strict';

var Priority = require('../models/priority');

exports.index = function(req, res){
  res.render('priorities/index');
};

exports.init = function(req, res){
  res.render('priorities/init');
};

exports.create = function(req, res){
  res.redirect('/priorities');
};

exports.index = function(req, res){
  Priority.all(function(priorities){
    console.log(priorities);
    res.render('priorities/index', {priorities:priorities});
  });
};
