var Filter   = require('../../lib/utils.js').Filter,
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering');

module.exports = function(app) {

  // Query Mongo to get matched coffees.
  app.post('/offerings/find', function(req, res, next) {

    Offering.find({}).exec(function(err, offerings) {
      if (err) throw err;

      var filter    = new Filter(offerings),
          available = filter.processForm(req.body);

      return res.json(JSON.stringify(available));
    });
  });

};
