var express = require('express');
var router = express.Router();
var item_controller = require('../controllers/itemController');
var category_controller = require('../controllers/categoryController');


/// ITEM ROUTES ///

//Store Home Page
router.get('/', item_controller.index);

router.get('/item/create', item_controller.item_create_get);

router.get('/item/:id', item_controller.item_detail);

router.get('/items', item_controller.item_list);







/// CATEGORY ROUTES ///
router.get('/category/create', category_controller.category_create_get);

router.get('/category/:id', category_controller.category_item_list);

router.get('/categories', category_controller.category_list);



module.exports = router;