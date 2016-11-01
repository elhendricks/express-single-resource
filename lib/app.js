const express = require('express');
const store = require('./store');
const bodyParser = require('body-parser');

const app = express();

app.get('/notes', (req, res) => {

    store.getall('./notes')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        if (err) res.sendStatus(404);
    });
});

app.get('/notes/:id', (req,res) => {
    store.getone('./notes', req.params.id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        if (err) res.sendStatus(404);
    });
});

app.delete('/notes/:id', (req, res) => {
    store.del('./notes', req.params.id)
    .then(() => {
        res.send(req.params.id + 'deleted');
    });
});

app.use(bodyParser.json());

app.post('/notes/:id', (req, res) => {
    store.post('./notes', req.params.id, req.body)
    .then( () => {
        res.send(req.params.id + ' added');
    });
});

app.put('/notes/:id', (req, res) => {
    store.put('./notes', req.params.id, req.body)
    .then( () => {
        res.send(req.params.id + ' added');
    });
});

module.exports = app;