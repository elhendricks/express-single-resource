const express = require('express');
const router = express.Router();
const bodyParser = require('../body-parser');
const store = require('../store');

router
    .get('/', (req, res, next) => {

        store.getall('./notes')
    .then(data => {
        res.send(data);
    })
    .catch( next
    );
    })
    .get('/:id', (req,res) => {
        store.getone('./notes', req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err) res.sendStatus(404);
        });
    })

    .delete('/:id', (req, res) => {
        store.del('./notes', req.params.id)
        .then(() => {
            res.send(req.params.id + 'deleted');
        });
    })

    .post('/:id', bodyParser, (req, res) => {
        store.post('./notes', req.params.id, req.body)
    .then( () => {
        res.send(req.params.id + ' added');
    });
    })

    .put('/:id', bodyParser, (req, res) => {
        store.put('./notes', req.params.id, req.body)
        .then( () => {
            res.send(req.params.id + ' added');
        });
    });

module.exports = router;