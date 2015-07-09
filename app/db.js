var mongoose = require('mongoose');

var mongoURI = process.env.NODE_ENV === 'test' ?
  'mongodb://localhost/testCoffee':
  'mongodb://localhost/getCoffee';

mongoose.connect(mongoURI);

// Load models.
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');
require(__dirname + '/models/User.js');
