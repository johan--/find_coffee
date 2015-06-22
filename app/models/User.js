var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var UserSchema = Schema({
  username:      { type: String, unique: true },
  email:         { type: String, default: '' },
  password:      { type: String, default: '' },
  created:       { type: Date, default: Date.now },
  roasteries:   [{ _id: {type: Schema.ObjectId, ref: 'Roastery' } }],
  offerings:    [{ _id: {type: Schema.ObjectId, ref: 'Offering' } }]
});

// Methods
UserSchema.methods = {

  authenticate: function(password) {
    return bcrypt.compareSync(password, this.password);
  },

  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
};

module.exports = mongoose.model('User', UserSchema);
