const assert = require('assert');
const expect = require('chai').expect
const request = require('request');
const { client, app } = require('../index.js')

describe('test connection', function () {
  before(function(){
    console.log('starting of a describe')
  })
  beforeEach(function(){
    console.log('starting of each it')
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

