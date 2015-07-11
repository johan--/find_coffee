var mongoose = require('mongoose'),
    should   = require('should'),
    app      = require('../server'),
    request  = require('supertest'),
    User     = mongoose.model('User'),
    userCount;

describe('Users', function() {

  // Signup
  describe('signup', function() {
    describe('invalid parameters', function() {

      before(function(done) {
        User.count(function(err, count) {
          userCount = count;
          done();
        });
      });

      it('should give error when no username', function(done) {
        request(app)
          .post('/users/new')
          .send({
            username: '',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(/Need both a username and a password./)
          .end(done);
      });

      it('should give error when no password', function(done) {
        request(app)
          .post('/users/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: ''
          })
          .expect(/Need both a username and a password./)
          .end(done);
      });

      it('shouldn\'t add user to database', function(done) {
        User.count(function(err, count) {
          count.should.equal(userCount);
          done();
        });
      });
    });

    describe('valid parameters', function() {

      it('should log in user', function(done) {
        request(app)
          .post('/users/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(201)
          .end(done);
      });

      it('should add user to database', function(done) {
        User.count(function(err, count) {
          count.should.equal(userCount + 1);
          done();
        });
      });


      it('shouldn\'t allow user with same username to sign up', function(done) {
        request(app)
          .post('/users/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(400)
          .end(done);
      });
    });
  });

  describe('login', function() {

    describe('invalid parameters', function() {

      it('should give error when no username given', function(done) {
        request(app)
          .post('/sessions/new')
          .send({
            username: '',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(400)
          .end(done);
      });

      it('should give error when no password given', function(done) {
        request(app)
          .post('/sessions/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: ''
          })
          .expect(400)
          .end(done);
      });

      it('should give error when username not found', function(done) {
        request(app)
          .post('/sessions/new')
          .send({
            username: 'notFound',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(400)
          .end(done);
      });

      it('should give error when wrong password is given', function(done) {
        request(app)
          .post('/sessions/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: 'wrong'
          })
          .expect(401)
          .end(done);
      });
    });

    describe('valid parameters', function() {

      it('should log in user', function(done) {
        request(app)
          .post('/sessions/new')
          .send({
            username: 'foobar',
            email: 'foo@bar.com',
            password: 'foobar'
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .end(done);
      });
    });

  });

  after(function(done) {
    User.remove({}, function(err) {
      done();
    });
  });
});
