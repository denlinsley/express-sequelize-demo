const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./server/routes');
// if you use global `sequelize`, you must install global `pg`

const app = express();
// parse response bodies containing JSON
app.use(bodyParser.json());
// parse query strings (set to `false` unless you need to prase objects and arrays)
app.use(bodyParser.urlencoded({ extended: false }));
// request logger middleware (`dev` is a formatting preset)
app.use(morgan('dev'));

// test middleware
app.all('/api/*', (req, res, next) => {
    console.log('api middleware');
    // must call `next()` in middleware!
    next();
});

// map router modules
app.use('/api/users', routes.users);

// basic routes for testing
app.get('/', (req, res) => res.status(200).send('Hello world!'));

app.get('/phish', (req, res) =>
    res.status(200).send({ message: 'Hello Phish!' }));

app.post('/phish', (req, res) => {
    res.send(
        'POST request to /phish with payload: ' + JSON.stringify(req.body)
    );
});

// catch-all route
app.get('*', (req, res) => res.sendStatus(404));

module.exports = app;
