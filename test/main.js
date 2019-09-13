const assert = require('assert');
const expect = require('chai').expect
const request = require('request');
const { client, app } = require('../index.js')

//describe('test connection', function () {
//  before(function(){
//    console.log('starting of a describe')
//  })
//  beforeEach(function(){
//    console.log('starting of each it')
//  })
//
//  it('OK status http connection', function () {
//    request("http://localhost:3001", function (err, res, body) {
//      if (err) {
//        return console.error('upload failed:', err);
//      }
//      assert.equal(res.statusCode, 200)
//    })
//  })
//});
//
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('try error', function(){
      assert.equal(2,2);
    }) 
  });
});
