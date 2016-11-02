
module.exports = function (req, res, next) {
    var body = '';
    console.log(body);
    req.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        try {
            // if (JSON.parse(body) instanceof SyntaxError) {
            //     throw 'invalid json';
            // }
            console.log(typeof body);
            req.body = body;
            console.log(JSON.parse(req.body));
            // next();
        } catch (e) {
            next(e);
        }
    });

};