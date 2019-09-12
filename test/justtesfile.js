

const assert = require('assert');
const expect = require('chai').expect
const request = require('request');
const app = require('../index.js')  // this invokes the application request
request("http://localhost:3001", function(err,res,body){
    if (err){
        return console.error('upload failed:', err);
    }
    // console.log(Object.keys(res))
    // console.log(res.statusCode)
    // console.log(res.headers)
    // console.log(res.client)
    
});
