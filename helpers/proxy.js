/*
 *  Helper file to manage all the rquired activities for forwarding request
 *  This file will be helpful in saving request data
 */

var requestProxy = require('express-request-wrapper');
var parser = require('./parser');
var fs = require('fs');
var apiDocFileName = "document.apib";

var autodocProxy = function() {

    var public = {};

    public.proxyGetRequest = function(req, cb) {
        var url = req.query.url;
            delete req.query.url;
        requestProxy.makeGetCall(url, req.query, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                fs.appendFile(apiDocFileName, blueprint, function(err) {
                    try{
                        body = JSON.parse(body); 
                    }catch(er){
                        console.log(er);
                    }
                    return cb(err, body, response);
                });
            });
    };

    public.proxyPostRequest = function(req, cb) {
        var url = req.query.url,
            isForm = false;
            delete req.query.url;
        if (req.headers['content-type'] == 'application/x-www-form-urlencoded')
            isForm = true;
        requestProxy.makePostCall(url, req.body, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                fs.appendFile(apiDocFileName, blueprint, function(err) {
                    try {
                        body = typeof body == 'object' ? body : JSON.parse(body);
                    } catch(e) {
                        console.log(e);
                    }
                    return cb(err, body, response);
                });
            }, isForm);
    };

    public.proxyPatchRequest = function(req, cb) {
        var url = req.query.url,
            isForm = false;
            delete req.query.url;
        if (req.headers['content-type'] == 'application/x-www-form-urlencoded')
            isForm = true;
        requestProxy.makePatchCall(url, req.body, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                fs.appendFile(apiDocFileName, blueprint, function(err) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {
                        console.log(e);
                    }
                    return cb(err, body, response);
                });
            }, isForm);
    };

    public.proxyDeleteRequest = function(req, cb) {
        var url = req.query.url;
            delete req.query.url;
        requestProxy.makeDeleteCall(url, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                body = body && typeof body == 'string'? JSON.parse(body) : body;
                var blueprint = parser.format(parsedPair);
                fs.appendFile(apiDocFileName, blueprint, function(err) {
                    return cb(err, body, response);
                });
            });
    };
    return public;
}

module.exports = autodocProxy();
