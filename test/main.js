const assert = require('assert');
const expect = require('chai').expect
const request = require('request');
const { client, app } = require('../index.js')

describe('testing main route/', function () {
  before(function(){
    console.log('starting')
  })
  beforeEach(function(){
    console.log('see.. this function is run EACH time')
  })
  it('OK status http connection', function () {
    request("http://localhost:3001", function (err, res, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      assert.equal(res.statusCode, 200)
    })
  })
});

