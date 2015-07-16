var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    Instagram = require('../services/Instagram.js'),
    Twitter   = require('../services/Twitter.js');

var RoasterySchema = Schema({
  name:     { type: String, unique: true },
  email:    String,
  phone:    String,
  website:  String,
  address:  String,
  city:     String,
  state:    String,
  zip:      Number,
  location: {
    lat: Number,
    lng: Number
  },
  instagram: {
    user_id:     String,
    location_id: String,
    hashtag:     String
  },
  twitter: {
    user_id:     String,
    screen_name: String
  }
});

// Statics
// =====================================================
RoasterySchema.statics = {

  // Get all roasters.
  getRoasters: function(cb) {
    var query = {},
        projection = {},
        options = { sort: { "name": 1 }};

    this.find(query, projection, options, function(err, roasters) {
      if (err) return cb(err);
      cb(null, roasters);
    });
  },

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

// Methods
// =====================================================
RoasterySchema.methods = {

  // Get recent media from Instagram.
  getInstagramMedia: function(type, cb) {
    var id;

    // Get recent photos that have been tagged at roaster's location.
    if (type === 'location') {
      id = this.instagram.location_id;

      Instagram.location_media_recent(id, function(err, result, remaining, limit) {
        if (err) return cb(err);
        cb(null, result);
      });

    // Get recent photos from roaster's official account.
    } else if (type === 'user') {
      id = this.instagram.user_id;

      Instagram.user_media_recent(id, function(err, result, remaining, limit) {
        if (err) return cb(err);
        cb(null, result);
      });

    // Otherwise error.
    } else {
      return new Error("Invalid type. Type should be 'location' or 'user'.");
    }
  }

};

module.exports = mongoose.model('Roastery', RoasterySchema);
