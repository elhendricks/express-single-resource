const bodyParser = require('../lib/body-parser');
const assert = require('chai').assert;
const EventEmitter = require('events');

describe('body-parser', () => {
    

    it('parses the body and adds to req.body', done => {
        const req = new EventEmitter();
        const testData = '{"data": "very important data"}';
        const next = () => {
            assert.deepEqual(req.body, JSON.parse(testData));
            done();
        };

        bodyParser(req, null, next);

        req.emit('data', testData);
        req.emit('end');

    });

    it('returns an error if there is invalid JSON', done => {
        const req = new EventEmitter();
        const testData = 'invalid json';
        const next = (arg) => {

            assert.equal(arg, 'invalid json');
            done();
        };

        bodyParser(req, null, next);        

        req.emit('data', testData);
        req.emit('end');
    });
});