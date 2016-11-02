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
        return sander.writeFile(dir, name +'.txt', JSON.stringify(body));
    },
    put (dir, name, body) {
        var filePath = path.join(dir, name + '.txt');
        return sander.readFile(filePath)
        .then(data => {
            data = data.toString();
            data = JSON.parse(data);
            for (var key in body) {
                data[key] = body[key];
            }
            console.log(data);
            data = JSON.stringify(data);
            console.log(2, data, typeof data);
            sander.writeFileSync(dir, name + '.txt', data);
        })
        .catch(err => {console.log(err);});
    }
};