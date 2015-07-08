var mongoose       = require('mongoose'),
    should         = require('should'),
    app            = require('../server'),
    assign         = require('object-assign'),
    request        = require('supertest'),
    helpers        = require('./helpers.js'),
    offeringCount;

describe('Form', function() {

  var defaultInputs = {
    blend:   false,
    decaf:   false,
    direct:  false,
    organic: false,
    origin:  'Any',
    process: 'Any',
    roaster: 'Any',
    search:  ''
  };

  before(function(done) {
    helpers.seedDatabase(done);
  });

  describe('checkboxes', function() {
    describe('decaf', function() {

      it('should return 1 coffee when checked', function(done) {
        var input = assign({}, defaultInputs, { decaf: true });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(1);
            done();
          });
      });

      it('should return 5 coffees when not checked', function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });

    describe('organic', function() {

      it('should return 1 coffee when checked', function(done) {
        var input = assign({}, defaultInputs, { organic: true });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(1);
            done();
          });
      });

      it('should return 5 coffees when not checked', function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });

    describe('blend', function() {

      it('should return 1 coffee when checked', function(done) {
        var input = assign({}, defaultInputs, { blend: true });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(1);
            done();
          });
      });

      it('should return 5 coffees when not checked', function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });

    describe('direct trade', function() {

      it('should return 1 coffee when checked', function(done) {
        var input = assign({}, defaultInputs, { direct: true });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(1);
            done();
          });
      });

      it('should return 5 coffees when not checked', function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });
  });

  describe('select inputs', function() {
    describe('origin', function() {

      it('should filters coffees based on origin', function(done) {
        var input = assign({}, defaultInputs, { origin: 'Kenya' });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(2);
            done();
          });
      });

      it("shouldn't filter when value is 'any'", function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });

    describe('roaster', function() {

      it('should filters coffees based on roastery', function(done) {
        var input = assign({}, defaultInputs, { roaster: 'Halfwit' });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(3);
            done();
          });
      });

      it("shouldn't filter when value is 'any'", function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });

    describe('process', function() {

      it('should filters coffees based on process', function(done) {
        var input = assign({}, defaultInputs, { process: 'Natural' });

        request(app)
          .post('/offerings/find')
          .send(input)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(2);
            done();
          });
      });

      it("shouldn't filter when value is 'any'", function(done) {
        request(app)
          .post('/offerings/find')
          .send(defaultInputs)
          .expect(200)
          .end(function(err, res) {
            var body = JSON.parse(res.body);
            if (err) return done(err);
            body.length.should.equal(5);
            done();
          });
      });
    });
  });

  describe('search box', function() {
    it('should return nothing when no descriptions match', function(done) {
      var input = assign({}, defaultInputs, { search: 'gasoline' });
      request(app)
        .post('/offerings/find')
        .send(input)
        .expect(200)
        .end(function(err, res) {
          var body = JSON.parse(res.body);
          if (err) return done(err);
          body.length.should.equal(0);
          done();
        });
    });

    it('should return match', function(done) {
      var input = assign({}, defaultInputs, { search: 'gin' });
      request(app)
        .post('/offerings/find')
        .send(input)
        .expect(200)
        .end(function(err, res) {
          var body = JSON.parse(res.body);
          if (err) return done(err);
          body.length.should.equal(1);
          done();
        });
    });
  });

  after(function(done) {
    helpers.clearDatabase(done);
  });

});
