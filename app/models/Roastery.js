var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var RoasterySchema = Schema({
  name:     { type: String, unique: true },
  email:    String,
  phone:    String,
  website:  String,
  address:  String,
  city:     String,
  state:    String,
  zip:      Number
});

RoasterySchema.statics = {

  // Get unique cities.
  getCities: function(cb) {
    this.distinct('city', function(err, results) {
      if (err) cb(err);
      var cities = results.sort();

      cb(null, cities);
    });
  },

  // Get all roasters from given city.
  getAllFromCity: function(city, cb) {
    this.find({ city: city }, function(err, cities) {
      if (err) cb(err);
      cb(null, cities);
    });
  }

};

module.exports = mongoose.model('Roastery', RoasterySchema);
