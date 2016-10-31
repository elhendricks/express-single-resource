const sander = require('sander');
const path = require('path');

module.exports = {
    getall: function(dir) {
        return sander.readdir(dir);
    },
    getone: function(dir, name) {
        var filePath = path.join(dir, name + '.txt');
        return sander.readFile(filePath)
        .then(data => {
            return data.toString();    
        });
    },
    del: function(dir, name) {
        var filePath = path.join(dir, name + '.txt');
        return sander.unlink(filePath);
    }
};