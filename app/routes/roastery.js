var mongoose = require('mongoose'),
    Roastery = mongoose.model('Roastery'),
    async = require('async');

module.exports = function(app) {

  // Load Instagram media.
  app.get('/roasters/instagram/:_id', function(req, res, next) {

    async.waterfall([

      // Load roaster.
      Roastery.load.bind(Roastery, req.params._id),

      // Get photos.
      function(roaster, cb) {
        roaster.getInstagramByUser(function(err, pics) {
          if (err) return cb(err);
          return res.json(pics);
        });
      }

    ]);
  });

  // Load Tweets.
  app.get('/roasters/twitter/:_id', function(req, res, next) {

    async.waterfall([

      // Load roaster.
      Roastery.load.bind(Roastery, req.params._id),

      // Get Tweets.
      function(roaster, cb) {
        roaster.getTweetsByUser(function(err, tweets) {
          if (err) return cb(err);
          return res.json(tweets);
        });
      }

    ]);
  });

};
