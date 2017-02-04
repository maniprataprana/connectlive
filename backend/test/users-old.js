var chai = require('chai');
var expect = chai.expect;
var request = require('superagent');
var server = require('../server');

// describe('User crud operations', function () {
// 	urlPrefix = 'http://localhost:4000';
// 	beforeEach(function(done) {
// 		server.listen(4000, 'localhost',function(err) {
// 			// console.log('listening on server..');
// 			done(err);
// 		});
// 	});

// 	afterEach(function(done) {
// 		server.close(function(err) {
// 			// console.log('server closed..');
// 			done(err);
// 		});
// 	});

// 	it('get list of all users', function(done) {
// 		// request(server)
// 		// 	.get('/users')
// 		// 	.expect(200, done);
// 		request
// 			.get(urlPrefix + '/users')
// 			.end(function(err, res) {
// 				console.log('err: ', err);
// 				console.log('res statusCode: ', res.statusCode);
// 				console.log('res: ', res.text);
// 				// expect(res.status, 200);
// 				done();
// 			});
// 	});

// });