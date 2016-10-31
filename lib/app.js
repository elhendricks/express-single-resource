const express = require('express');
const store = require('./store');
const path = require('path');
const sander = require('sander');

const app = express();

app.get('/notes', (req, res) => {

    store.getall('./notes')
    .then(data => {
        res.send(data);
    });
});

app.get('/notes/:id', (req,res) => {
    store.getone('./notes', req.params.id)
    .then(data => {
        res.send(data);
    });
});

app.delete('/notes/:id', (req, res) => {
    store.del('./notes', req.params.id)
    .then(() => {
        res.send(req.params.id + 'deleted');
    });
});

app.post('/notes/:id', (req, res) => {
    store.post('./notes', req.params.id)
    .then(
        res.send(req.params.id + 'added')
    );
});

module.exports = app;