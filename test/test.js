var assert = require('assert');
var requestProxy = require('express-request-wrapper');
var parser = require('../helpers/parser');

describe('Testing Proxy Parser', function() {
	describe('#format()', function() {
		this.timeout(6000);
		it('Parse get request response', function(done) {
			requestProxy.makeGetCall('http://localhost:3000/getEndpoint', {
					test: "123"
				}, {
					"content-type": "application/json"
				},
				function(err, body, response) {
					console.log(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					console.log(blueprint);
					done();
				})
		});
	});
});
