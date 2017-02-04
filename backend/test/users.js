var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var applib = require('../applib');

describe('User CRUD operations', function() {

  it('should list all users', function(done) {
    var fake = function(query, cb) {
      cb(null, [{ id: 1, email: 'foo@foobar.com' }]);
    };
    var stub = sinon.stub(User, 'find', fake);
    var req = {};
    var res = {
      json: function(data) {
        expect(data[0].id).to.equal(1);
        expect(data[0].email).to.equal('foo@foobar.com');
        done();
      }
    };
    users.list(req, res);
    stub.restore();
  });
  
  it('should err on user listing', function(done) {
    var fake = function(query, cb) {
      cb(new Error('Error'), null);
    };
    var stubUserFind = sinon.stub(User, 'find', fake);
    var stubHandleError = sinon.stub(applib, 'handleError');
    var req = {};
    var res = {};
    users.list(req, res);
    expect(stubHandleError.withArgs(res, new Error('Error')).calledOnce).to.be.true;
    stubUserFind.restore();
    stubHandleError.restore();
    done();
  });



  // it('should create a new user', function(done) {
  //   var req = {
  //     body: {
  //       'name': 'abc',
  //       'email': 'abc@123.com',
  //       'password': 'abc123',
  //     }
  //   };


  // });

});