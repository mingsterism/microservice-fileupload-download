const assert = require('assert');
const expect = require('chai').expect
const request = require('request');
const { client, app } = require('../index.js')

describe('testing main route/', function () {

  it('OK status http connection', function () {
    request("http://localhost:3001", function (err, res, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log(Object.keys(res))
      console.log(res.statusCode)
      // console.log(res.headers)
      // console.log(res.client)
      assert.equal(res.statusCode, 200)

    })
  })
});

