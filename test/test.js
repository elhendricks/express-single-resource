const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const assert = chai.assert;
const sander = require('sander');


describe('app.js', () => {
    var request = chai.request(app);

    before(done => {
        sander.writeFile('./notes', 'stuff.txt', 'I\'m a little teapot')
        .then(() => {
            sander.writeFile('./notes', 'news.txt', '{"freshness":"Old News"}');
        })
        .then(() => {
            sander.writeFile('./notes', 'cool-ideas.txt', '{"level":"awesome"}');
        })
        .then(() => {
            sander.unlink('./notes/my-notes.txt');
        })        
        .then(() => {
            done();
        });
    });

    it('makes a get request', done => {
        request
        .get('/notes/cool-ideas')
        .end((err, res) => {
            assert.equal(res.text ,'{"level":"awesome"}');
            done();
        });
    });

    it('gives a 404 if file not there on a get request', done => {
        request
        .get('/notes/bad-ideas')
        .end((err, res) => {
            assert.equal(res.statusCode , 404);
            done();
        });
    });

    it('makes a post request', done => {
        var testData = '{ "noteBody":"hello world" }';
        request
        .post('/notes/my-notes')
        .set('Content-Type', 'application/json')
        .send(testData)
        .end(() => {
            sander.readFile('./notes/my-notes.txt')
            .then((data) => { 
                assert.equal(data.toString(), testData);
            })
            .then( () => {
                done();
            });
        });
    });

    it('updates file after put request', done => {
        request
        .put('/notes/news')
        .set('Content-Type', 'application/json')
        .send('{ "freshness":"New News" }')
        .end(() => {
            sander.readFile('./notes/news.txt')
            .then((data) => { 
                assert.equal(data.toString(), '{"freshness":"New News"}');
            })
            .then( () => {
                done();
            })
            .catch(err => {
                done(err);
            });
        });
    });

    it('deletes a file', done => {
        request
        .del('/notes/stuff')
        .end(() => {
            sander.readdir('./notes/')
            .then(files => {
                assert(files.indexOf('stuff.txt' === -1));
                done();
            })
            .catch(err => {
                console.log('ERROR IN DEL: ', err);
                done(err);
            });
        });
    });
});