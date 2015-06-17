var mongoose = require('mongoose');

// Connect to Mongo.
mongoose.connect('mongodb://localhost/getCoffee');

// Load models.
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');
require(__dirname + '/models/User.js');

// Expose
module.exports = {
  Offering: mongoose.model('Offering'),
  Roastery: mongoose.model('Roastery'),
  User:     mongoose.model('User')
};
