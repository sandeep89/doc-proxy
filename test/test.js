var assert = require('assert');
var requestProxy = require('express-request-wrapper');
var parser = require('../helpers/parser');
var bluePrintValidator = require('api-blueprint-validator-module');

describe('Testing Proxy Parser', function() {
	describe('#format()', function() {
		it('should parse GET request response', function(done) {
			requestProxy.makeGetCall('http://localhost:3000/getEndpoint', {
					search: "123"
				}, {
					"content-type": "application/json"
				},
				function(err, body, response) {
					if (err) return done(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					bluePrintValidator.parseAndValidateString(blueprint, function(err, result) {
						if (err || result.errors.length) {
							return done(new Error("Error in blueprint"))
						}
						done();
					});
				})
		});

		it('should parse POST request response', function(done) {
			requestProxy.makePostCall('http://localhost:3000/postEndpoint', {
					UserName: "test",
					Password: "test"
				}, {
					"content-type": "application/json",
					"Authorization": "BASIC BM358XceWs7x%2FXEh82QoRg4jne0aqN0akvxYp3aWA%2FA"
				},
				function(err, body, response) {
					if (err) return done(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					bluePrintValidator.parseAndValidateString(blueprint, function(err, result) {
						if (err || result.errors.length) {
							return done(new Error("Error in blueprint"))
						}
						done();
					});
				})
		});

		it('should parse PUT request response', function(done) {
			requestProxy.makePutCall('http://localhost:3000/putEndpoint', {
					UserName: "test",
					Password: "test",
					name: "Testing user"
				}, {
					"content-type": "application/json",
					"Authorization": "BASIC BM358XceWs7x%2FXEh82QoRg4jne0aqN0akvxYp3aWA%2FA"
				},
				function(err, body, response) {
					if (err) return done(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					bluePrintValidator.parseAndValidateString(blueprint, function(err, result) {
						if (err || result.errors.length) {
							return done(new Error("Error in blueprint"))
						}
						done();
					});
				})
		});

		it('should parse PATCH request response', function(done) {
			requestProxy.makePatchCall('http://localhost:3000/patchEndpoint', {
					name: "test user"
				}, {
					"content-type": "application/json",
					"Authorization": "BASIC BM358XceWs7x%2FXEh82QoRg4jne0aqN0akvxYp3aWA%2FA"
				},
				function(err, body, response) {
					if (err) return done(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					bluePrintValidator.parseAndValidateString(blueprint, function(err, result) {
						if (err || result.errors.length) {
							return done(new Error("Error in blueprint"))
						}
						done();
					});
				})
		});

		it('should parse DELETE request response', function(done) {
			requestProxy.makeDeleteCall('http://localhost:3000/deleteEndpoint', {
					"content-type": "application/json",
					"Authorization": "BASIC BM358XceWs7x%2FXEh82QoRg4jne0aqN0akvxYp3aWA%2FA"
				},
				function(err, body, response) {
					if (err) return done(err);
					var parsedPair = {
						'request': response.request,
						'response': response
					};
					var blueprint = parser.format(parsedPair);
					bluePrintValidator.parseAndValidateString(blueprint, function(err, result) {
						if (err || result.errors.length) {
							return done(new Error("Error in blueprint"))
						}
						done();
					});
				})
		});

	});
});
