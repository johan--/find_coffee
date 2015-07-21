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
      if (err) return cb(err);
      var cities = results.sort();

      cb(null, cities);
    });
  },

  // Get all roasters from given city.
  getAllFromCity: function(city, cb) {
    this.find({ city: city }, function(err, cities) {
      if (err) return cb(err);
      cb(null, cities);
    });
  },

  load: function(_id, cb) {
    this.findOne({ _id: _id }, function(err, roaster) {
      if (err) return cb(err);
      cb(null, roaster);
    });
  }

};

// Methods
// =====================================================
RoasterySchema.methods = {

  // Get recent photos that have been tagged at roaster's location.
  getInstagramByLocation: function(cb) {
    Instagram.location_media_recent(this.instagram.location_id, function(err, result) {
      if (err) return cb(err);
      cb(null, result);
    });
  },

  // Get recent photos from roaster's Instagram account.
  getInstagramByUser: function(cb) {
    Instagram.user_media_recent(this.instagram.user_id, function(err, result) {
      if (err) return cb(err);
      cb(null, result);
    });
  },

  // Get recent tweets from roaster's Twitter account.
  getTweetsByUser: function(cb) {
    Twitter.get('statuses/user_timeline', { screen_name: this.twitter.screen_name },
      function(err, tweets, res) {
        if (err) return cb(err);
        cb(null, tweets);
      });
  }

};

module.exports = mongoose.model('Roastery', RoasterySchema);
