var bf = require('../helpers/parser');

var parseResult = function(err, body, response) {
    var parsedPair = {
        'request': response.request,
        'response': response
    };
    var blueprint = bf.format(parsedPair);
}

module.exports = parseResult;