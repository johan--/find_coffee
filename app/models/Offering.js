var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var OfferingSchema = Schema({

  roastery:  {
    _id:  { type: Schema.ObjectId, ref: 'Roastery' },
    name: { type: String } 
  },
  name:    String,
  start:   Date,
  end:     Date,
  price:   Schema.Types.Mixed,
  url:     String,

  origin:    { type: [], get: get, set: set },
  region:    { type: [], get: get, set: set },
  producer:  { type: [], get: get, set: set },
  farm:      { type: [], get: get, set: set },
  elevation: { type: [], get: get, set: set },
  process:   { type: [], get: get, set: set },
  sourced:   { type: [], get: get, set: set },
  varietals: { type: [], get: get, set: set },
  method:    { type: [], get: get, set: set },
  harvest:   { type: [], get: get, set: set },

  flavors:   { type: [], get: get, set: set },
  description: String, // Long description of flavors
  background:  String, // Background info on coffee

  blend:       { type: Boolean, default: false },
  decaf:       { type: Boolean, default: false },
  organic:     { type: Boolean, default: false },
  directTrade: { type: Boolean, default: false },
  fairTrade:   { type: Boolean, default: false },
  current:     { type: Boolean, default: true },
  meta: {
    created:     { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
  }
});

// Getters/Setters
// =======================================================
function get(val) {
  return val.join(', ');
}

function set(val) {
  return val.split(', ');
}

// Statics
// =======================================================
OfferingSchema.statics = {

  // Return unique roasters.
  getUniqueRoasters: function(cb) {
    this.distinct('roastery.name', function(err, results) {
      if (err) return cb(err);
      var roasters = results.sort();

      if (roasters[0] === '') roasters.shift();

      // Add 'Any' option.
      roasters.unshift('Any');

      cb(null, roasters);
    });
  },

  // Return unique origins.
  getUniqueOrigins: function(cb) {
    this.distinct('origin', function(err, results) {
      if (err) return cb(err);
      var origins = results.sort();

      if (origins[0] === '') origins.shift();

      // Add 'Any' option.
      origins.unshift('Any');

      cb(null, origins);
    });
  },

  // Return all offerings.
  getOfferings: function(cb) {
    var query      = { "current": true },
        projection = {},
        options    = { sort: {"meta.created": -1 }};
    
    this.find(query, projection, options, function(err, offerings) {
      if (err) return cb(err);
      cb(null, offerings);
    });
  },

};

module.exports = mongoose.model('Offering', OfferingSchema);
