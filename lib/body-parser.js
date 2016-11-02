
module.exports = function (req, res, next) {
    var body = '';
    console.log(body);
    req.on('data', chunk => {
        body += chunk;
    }).on('end', () => {
        try {
            req.body = JSON.parse(body);            
        } catch (e) {
            next('invalid json');
            return;
        }
        next();
        console.log('I escaped');
    });

};