var express = require('express');
var router = express.Router();
var item_controller = require('../controllers/itemController');
var category_controller = require('../controllers/categoryController');


/// ITEM ROUTES ///

//Item Home Page
router.get('/', item_controller.index);







/// CATEGORY ROUTES ///