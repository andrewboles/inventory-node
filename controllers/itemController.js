const { body,validationResult } = require('express-validator');
var Item = require('../models/item');
var Category = require('../models/category');
var async = require('async');


exports.index = function(req,res) {
    async.parallel({
        item_count: function(callback) {
            Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        category_count: function(callback) {
            Category.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Store Home', error: err, data: results });
    });
}

exports.item_detail = function (req, res, next) {
    Item.findById(req.params.id)
        .populate('category')
        .exec(function(err, results) {
            if(err) { return next(err); }
            
            res.render('item_detail', { title: results.name, item: results});
        });
};

exports.item_list = function (req, res, next) {
    Item.find({},'name description price')
        .sort({name: 1})
        .exec(function(err, list_items) {
            if(err) { return next(err); }
            
            res.render('item_list', { title: 'Full Item List', item_list: list_items});
        });
};

exports.item_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: item create GET');
};