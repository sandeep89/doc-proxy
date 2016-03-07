// Module containing common helper methods
var request = require("request");
var debug = require('debug')('autodoc:routes:util');

var util = function() {
    var public = {};
    var debugOn = process.env.DEBUG ?
        process.env.DEBUG.indexOf('oneness') > -1 : false;

    /**
        Base wrapper on request post call, this gives us opportunity to add
        pre-processing if requried on request default post request

        Since this is a proxy give the response object to underlying callback
    */
    public.makePostCall = function(url, formData, headers, cb, isForm) {
        if (debugOn) console.time("postRequest " + url);
        var requestData = {
            url: url,
            json: formData,
            headers: headers
        }
        if (isForm) {
            delete requestData.json;
            requestData.form = formData;
        }
        request
            .post(requestData,
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if ([201, 200].indexOf(response.statusCode) > -1) {
                        if (debugOn) console.timeEnd("postRequest " + url);
                        return cb(null, body, response)
                    } else {
                        debug('%s %s %s %s', url, response.statusCode,
                            JSON.stringify(formData), JSON.stringify(headers));
                        return cb(new Error("Invalid response from server in " +
                            "post call " + url), body, response);
                    }
                });
    }

    public.makeGetCall = function(url, query, headers, cb) {
        if (debugOn) console.time("getRequest " + url);
        request
            .get({
                    url: url,
                    query: query,
                    headers: headers
                },
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if (response.statusCode == 200) {
                        if (debugOn) console.timeEnd("getRequest " + url);
                        return cb(null, body, response)
                    } else {
                        debug('%s %s %s %s', url, response.statusCode,
                            JSON.stringify(query), JSON.stringify(headers));
                        return cb(new Error("Invalid response from server " +
                            "in get Request " + url), body, response);
                    }
                });
    }

    public.makePatchCall = function(url, formData, headers, cb) {
        if (debugOn) console.time("patchRequest " + url);
        request
            .patch({
                    url: url,
                    json: formData,
                    headers: headers
                },
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if (response.statusCode == 200) {
                        if (debugOn) console.timeEnd("patchRequest " + url);
                        return cb(null, body, response)
                    } else {
                        debug('%s %s %s %s', url, response.statusCode,
                            JSON.stringify(formData), JSON.stringify(headers));
                        return cb(new Error("Invalid response from server in " +
                            "patch call " + url), body, response);
                    }
                })
    }

    public.makeDeleteCall = function(url, headers, cb) {
        if (debugOn) console.time("deleteRequest " + url);
        request.del({
            url: url,
            headers: headers
        }, function(err, response, body) {
            if (err) {
                return cb(err);
            }
            if (response.statusCode == 200) {
                if (debugOn) console.timeEnd("deleteRequest " + url);
                return cb(null, body, response)
            } else {
                debug("%s %s %s", url, response.statusCode, JSON.stringify(headers));
                return cb(new Error("Invalid response from server in " +
                    "delete call " + url), body, response);
            }
        })
    }
    return public;
}

module.exports = util();