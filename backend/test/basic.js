// var chai = require('chai');
// var expect = chai.expect;
// var request = require('superagent');
// var sinon = require('sinon'); 

// var arithmetic = {
// 	add: function(x, y) {

// 		return x + y;
// 	}


// }
// console.log('add: ', arithmetic.add(10,20));

// describe('this is my first ever test case', function() {
// 	it('adds numbers', function() {
// 		var fakeAdd = sinon.stub(arithmetic, 'add');

// 		// fakeAdd.withArgs(2, 3).onCall(0).returns(10);
// 		// fakeAdd.withArgs(2, 3).returns(5);
// 		// fakeAdd.returns(100);
// 		// fakeAdd.callsArgWith(1, 100, 200).returns(100);
// 		fakeAdd.yields(100, 200).returns(100);

// 		// expect(arithmetic.add(2,3)).to.be.equal(10);
// 		// expect(arithmetic.add(2,3)).to.be.equal(5);
// 		// expect(arithmetic.add(2,30)).to.be.equal(100);
		
// 		expect(arithmetic.add(102, 300, function() {}, function() {})).to.be.equal(100);


// 	});

// });