var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:5009/' , function(error, response, body) {
        console.log(error,body)
        expect(body).to.equal('Server Started');
        done();
    });
});