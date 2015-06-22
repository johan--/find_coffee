var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var OfferingSchema = Schema({

  roastery:  {
    _id:  { type: Schema.ObjectId, ref: 'Roastery' },
    name: { type: String } 
  },
  name:      { type: String, unique: true },
  start:       Date,
  end:         Date,
  price:       Number,
  url:         String,

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
    lastUpdated: Date
  }
});

// getters & setters
// =======================================================
function get(val) {
  return val.join(', ');
}

function set(val) {
  return val.split(', ');
}

module.exports = mongoose.model('Offering', OfferingSchema);
