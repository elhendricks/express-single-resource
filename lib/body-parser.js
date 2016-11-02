
module.exports = function (req, res, next) {
    var body = '';
    req.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        req.body = body;
        next();
    });
    
};