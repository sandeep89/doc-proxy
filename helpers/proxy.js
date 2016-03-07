/*
 *	Helper file to manage all the rquired activities for forwarding request
 * 	This file will be helpful in saving request data
 */

var requestProxy = require('express-request-wrapper');
var parser = require('./parser');

var autodocProxy = function() {

    var public = {};

    public.proxyGetRequest = function(req, cb) {
        if (req.query) {
            var url = req.query.url;
        } else {
            return cb(new Error('Invalid url provided'));
        }
        requestProxy.makeGetCall(url, req.body, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                console.log(blueprint);
                return cb(err, body, response);
            });
    }
    return public;
}

module.exports = autodocProxy();