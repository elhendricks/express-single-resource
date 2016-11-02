const sander = require('sander');
const path = require('path');



module.exports = {
    getall(dir) {
        return sander.readdir(dir);
    },
    getone(dir, name) {
        var filePath = path.join(dir, name + '.txt');
        return sander.readFile(filePath)
        .then(data => {
            return data.toString();    
        });
    },
    del(dir, name) {
        var filePath = path.join(dir, name + '.txt');
        return sander.unlink(filePath);
    },
    post (dir, name, body) {
        return sander.writeFile(dir, name +'.txt', body);
    },
    put (dir, name, body) {
        var parsedBody = JSON.parse(body);
        
        var filePath = path.join(dir, name + '.txt');
        return sander.readFile(filePath)
        .then(data => {
            data = data.toString();
            data = JSON.parse(data);
            for (var key in parsedBody) {
                data[key] = parsedBody[key];

            }
            data = JSON.stringify(data);
            sander.writeFileSync(dir, name + '.txt', data);
        })
        .catch(err => {console.log(err);});
    }
};