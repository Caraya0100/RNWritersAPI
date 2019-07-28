'use strict';

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const cookieParser = require('cookie-parser')();
const app = express();
const admin = require('firebase-admin');
admin.initializeApp();

const entries = require('./entries');
const users = require('./users');

app.use(cors);
app.use(cookieParser);
app.post('/add/entry', entries.add);
app.get('/entry/:id', entries.get);
app.get('/entries', entries.getAll);
app.put('/update/entry/:id', entries.update);
app.delete('/delete/entry/:id', entries.delete);
app.get('/entries/user/:id', entries.getUserEntries);
app.post('/add/user', users.add);
app.get('/user/:id', users.get);
app.get('/users', users.getAll);
app.put('/update/user/:id', users.update);
app.delete('/delete/user/:id', users.delete);

exports.api = functions.https.onRequest(app);