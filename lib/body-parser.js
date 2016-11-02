
module.exports = function (req, res, next) {
    var body = '';
    console.log(body);
    req.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        try {
            req.body = body;
            next();
        } catch (err) {
            next('invalid json');
        }

    });

};