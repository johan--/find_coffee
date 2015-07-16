var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    gram     = require('instagram-node').instagram();

gram.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

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

    // Get recent photos that have been tagged at roaster's location.
    if (type === 'location') {
      gram.location_media_recent(this.instagram.location_id, function(err, result, remaining, limit) {
        if (err) return cb(err);
        cb(null, result);
      });

    // Get recent photos from roaster's official account.
    } else if (type === 'user') {
      gram.user_media_recent(this.instagram.user_id, function(err, result, remaining, limit) {
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
