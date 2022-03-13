const { body,validationResult } = require('express-validator');
var Item = require('../models/item');
var Category = require('../models/category');
var async = require('async');


exports.category_item_list = function(req,res) {
    res.send('NOT IMPLEMENTED: list of items in a particular category');
}

exports.category_list = function (req, res, next) {
    Category.find({},'name description price')
        .sort({name: 1})
        .exec(function(err, list_categories) {
            if(err) { return next(err); }
            
            res.render('category_list', { title: 'List of Categories', category_list: list_categories});
        });
};

exports.category_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: category create GET');
}   