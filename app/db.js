var mongoose = require('mongoose');

// Connect to Mongo / load models.
mongoose.connect('mongodb://localhost/getCoffee');
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');

module.exports = {
  Offering: mongoose.model('Offering'),
  Roastery: mongoose.model('Roastery')
};
