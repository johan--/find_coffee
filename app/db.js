var mongoose = require('mongoose');

var mongoURL = process.env.NODE_ENV === 'test' ?
  process.env.MONGOLAB_TEST_URL :
  process.env.MONGOLAB_COFFEE_URL;

mongoose.connect(process.env.MONGOLAB_COFFEE_URL);

// Load models.
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');
require(__dirname + '/models/User.js');
