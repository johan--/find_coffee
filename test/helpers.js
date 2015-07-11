var mongoose = require('mongoose'),
    fs       = require('fs'),
    path     = require('path'),
    assign   = require('object-assign'),
    async    = require('async'),
    Offering = mongoose.model('Offering'),
    Roastery = mongoose.model('Roastery');

function seedDatabase(finished) {
  async.waterfall([

    // Get seed data.
    function(callback) {
      var filename = path.join(__dirname, 'seeds.json');
      fs.readFile(filename, function(err, data) {
        if (err) throw err;
        callback(null, JSON.parse(data));
      });
    },

    // Create two different roasteries.
    function(data, callback) {
      var halfwit   = data.Roasteries[0],
          gaslight  = data.Roasteries[1],
          offerings = data.Offerings;

      Roastery.create(halfwit, gaslight, function(err, Halfwit, Gaslight) {
        if (err) throw err;

        var roasterInfo = {
          Halfwit:  { _id: Halfwit._id, name: Halfwit.name },
          Gaslight: { _id: Gaslight._id, name: Gaslight.name }
        };

        callback(null, roasterInfo, offerings);
      });
    },

    // Create offerings.
    function(roasterInfo, offerings, callback) {

      var Halfwit  = roasterInfo.Halfwit,
          Gaslight = roasterInfo.Gaslight;

      var decaf   = assign({}, offerings.decaf, { roastery: Halfwit }),
          organic = assign({}, offerings.organic, { roastery: Halfwit }),
          direct  = assign({}, offerings.direct, { roastery: Halfwit }),
          blend   = assign({}, offerings.blend, { roastery: Gaslight }),
          honey   = assign({}, offerings.honey, { roastery: Gaslight });

      var allOfferings = [decaf, organic, direct, blend, honey];

      Offering.create(allOfferings, function(err, Offerings) {
        if (err) throw err;
        finished();
      });
    }
  ]);
}

function clearDatabase(finished) {
  async.parallel([

    function(callback) {
      Offering.remove({}, function(err) {
        if (err) callback(err);
        callback(null);
      });
    },

    function(callback) {
      Roastery.remove({}, function(err) {
        if (err) callback(err);
        callback(null);
      });
    }
  ],

  function(err, results) {
    if (err) throw err;
    finished();
  });
}

module.exports = {
  seedDatabase: seedDatabase,
  clearDatabase: clearDatabase
};
