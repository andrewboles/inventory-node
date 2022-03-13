#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []

function itemCreate(name, description, price, quantity, category, cb) {
  itemdetail = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  }
  if (category != false) itemdetail.category = category

  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate("Guitars", callback);
        },
        function(callback) {
          categoryCreate("Effects Pedals", callback);
        },
        function(callback) {
          categoryCreate("Amps", callback);
        }
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('PRS Custom 24', '24 Fret Rosewood Fretboard Guitar', 3500, 6, [categories[0],], callback);
        },
        function(callback) {
          itemCreate('PRS Custom 22', '22 Fret Rosewood Fretboard Guitar', 2750, 12, [categories[0],], callback);
        },
        function(callback) {
          itemCreate('Gibson Les Paul', '22 Fret Teakwood Fretboard Guitar', 3950, 16, [categories[0],], callback);
        },
        function(callback) {
          itemCreate('Schecter Deathzone', '22 Fret Floyd Rose Bridge Guitar', 2200, 8, [categories[0],], callback);
        },
        function(callback) {
          itemCreate('Boss Metal Zone', 'The definitive distortion pedal ', 80, 60, [categories[1],], callback);
        },
        function(callback) {
          itemCreate('Streymon Big Sky Reverb', 'Gorgeous Reverb Pedal', 300, 3, [categories[1],], callback);
        },
        function(callback) {
          itemCreate('Fender Double Reverb', 'Clean Fender Sound', 700, 11, [categories[2],], callback);
        },
        function(callback) {
          itemCreate('Marshall Stack', 'The definitive stack to blow peoples eardrums', 2400, 3, [categories[2],], callback);
        },
        ],
        // optional callback
        cb);
}


async.series([
    createCategories,
    createItems,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('success');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




