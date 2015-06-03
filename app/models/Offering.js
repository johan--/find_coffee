var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var OfferingSchema = mongoose.Schema({

  roastery:  { type: Schema.ObjectId, ref: 'Roastery' },
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
  description: String, // long description of flavors
  background:  String, // background info on coffee

  blend:       Boolean,
  decaf:       Boolean,
  organic:     Boolean,
  directTrade: Boolean,
  fairTrade:   Boolean,
  current:     Boolean
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
