var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    jwt      = require('jsonwebtoken'),
    async    = require('async'),
    Schema   = mongoose.Schema,
    Offering = mongoose.model('Offering'),
    Roastery = mongoose.model('Roastery');

var UserSchema = Schema({

  username:     { type: String, unique: true },
  email:        { type: String, default: '' },
  password:     { type: String, default: '' },
  created:      { type: Date, default: Date.now },
  admin:        { type: Boolean, default: false },
  roasteries:   [{ type: String }],
  offerings:    [{ type: String }]

});

// Statics
UserSchema.statics = {

  // Load a user by _id and return their offerings and roasters.
  load: function(_id, callback) {
    var self = this;

    async.waterfall([

      // Load user.
      function(cb) {
        self.findOne({ _id: _id }, function(err, user) {
          if (err) return cb(err);
          cb(null, user);
        });
      },

      // Get offerings & roasteries.
      function(user, cb) {
        async.parallel([
          user.getRoasteries.bind(user),
          user.getOfferings.bind(user)
        ],
        function(err, results) {
          if (err) return callback(err);

          var data = {
            user: user,
            roasters: results[0],
            offerings: results[1]
          };

          return callback(null, data);
        });
      }

    ]);
  },

  followRoaster: function(user_id, roaster_id, cb) {
    var query = { _id: user_id },
        update = { $addToSet: { roasteries: roaster_id }},
        self = this;

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
