var mongoose = require('mongoose'),
    Roastery = mongoose.model('Roastery'),
    async    = require('async');

module.exports = function(app) {

  // Load Instagram media.
  app.post('/roasters/instagram', function(req, res, next) {

    async.waterfall([

      // Load roaster.
      function(cb) {
        Roastery.find({ _id: req.body._id }, function(err, roasters) {
          if (err) return cb(err);
          cb(null, roasters[0]);
        });
      },

      // Get photos.
      function(roaster, cb) {
        roaster.getInstagramByLocation(function(err, pics) {
          if (err) return cb(err);
          return res.json(JSON.stringify(pics));
        });
      }

    ]);
  });

};
