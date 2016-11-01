
module.exports = function (req, res, next) {
    var body = '';
    console.log(body);
    req.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        console.log(body, typeof body);
        req.body = body;
        console.log(req.body, typeof req.body);
        next();
    });
    
};