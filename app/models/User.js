var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    jwt      = require('jsonwebtoken'),
    Schema   = mongoose.Schema,
    Offering = mongoose.model('Offering'),
    Roastery = mongoose.model('Roastery');

var UserSchema = Schema({
  username:     { type: String, unique: true },
  email:        { type: String, default: '' },
  password:     { type: String, default: '' },
  created:      { type: Date, default: Date.now },
  admin:        { type: Boolean, default: false },
  roasteries:   [{ _id: {type: Schema.ObjectId, ref: 'Roastery' } }],
  offerings:    [{ _id: {type: Schema.ObjectId, ref: 'Offering' } }]
});

// Statics
UserSchema.statics = {

  followRoaster: function(user_id, roaster_id, cb) {
    var query = { _id: user_id },
        update = { $addToSet: { roasteries: roaster_id }};

    this.update(query, update, function(err, num) {
      if (err) return cb(err);
      cb(null, num);
    });
  }

};

// Methods
UserSchema.methods = {

  createToken: function() {
    return jwt.sign(this, 'marzocco', { expiresInMinutes: 60 * 12 });
  },

  authenticate: function(password) {
    return bcrypt.compareSync(password, this.password);
  },

  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  // Get all roasters a user is following.
  getRoasteries: function(cb) {
    var query = { _id: { $in: this.roasteries }};

    Roastery.find(query, function(err, roasters) {
      if (err) return cb(err);
      cb(null, roasters);
    });
  },

  // Get all offerings a user is following.
  getOfferings: function(cb) {
    var query = {
      $or: [
        { "roastery._id": { $in: this.roasteries }},
        { "_id": { $in: this.offerings }}
      ]
    };

    Offering.find(query, function(err, offerings) {
      if (err) return cb(err);
      cb(null, offerings);
    });
  },

  // Remove roaster from list of roasteries.
  removeRoaster: function(roasterToRemove) {
    var list = this.roasteries.filter(function(roaster) {
      return roaster !== roasterToRemove;
    });

    var query  = { _id: this._id },
        update = { roasteries: list };

    this.update(query, update, function(err, num) {
      if (err) throw err;
    });
  }

};

module.exports = mongoose.model('User', UserSchema);
