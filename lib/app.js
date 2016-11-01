const express = require('express');
const errorHandler = require('./error-handler');
const app = express();
const notes = require('./routes/notes');

app.use('/notes', notes);

app.use(errorHandler);

module.exports = app;