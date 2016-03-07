var express = require('express');
var router = express.Router();
var proxy = require('../helpers/proxy');

router.use(function(req, res, next) {
    delete req.headers['accept-encoding'];
    delete req.headers.host;
    next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.route('/proxy')
    .get(function(req, res, next) {
        proxy.proxyGetRequest(req, function(err, body, response) {
            return res.status(response.statusCode).send(body);
        });
    });

module.exports = router;