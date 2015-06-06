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

module.exports = mongoose.model('Roastery', RoasterySchema);
