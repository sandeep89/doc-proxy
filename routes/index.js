var express = require('express');
var router = express.Router();
var proxy = require('../helpers/proxy');

router.use(function(req, res, next) {
    if (req.query && req.query.url) {
        delete req.headers['accept-encoding'];
        delete req.headers.host;
        delete req.headers['accept-language'];
        delete req.headers['origin'];
        delete req.headers['user-agent'];
        next();
    } else {
        req.message = "Invalid URL provided";
    }
});
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        message: req.message
    });
});

router.route('/proxy')
    .get(function(req, res, next) {
        proxy.proxyGetRequest(req, function(err, body, response) {
            if (err) return next(err);
            return res.status(response.statusCode).json(body);
        });
    })
    .post(function(req, res, next) {
        proxy.proxyPostRequest(req, function(err, body, response) {
            if (err) return next(err);
            return res.status(response.statusCode).json(body);
        });
    })
    .patch(function(req, res, next) {
        proxy.proxyPatchRequest(req, function(err, body, response) {
            if (err) return next(err);
            return res.status(response.statusCode).json(body);
        });
    })
    .delete(function(req, res, next) {
        proxy.proxyDeleteRequest(req, function(err, body, response) {
            if (err) return next(err);
            return res.status(response.statusCode).json(body);
        });
    });

module.exports = router;
