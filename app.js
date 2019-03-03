const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const reports = require('./routes/reports');

const app = express();
const port = 8333;

app.use(cors());


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Routes
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/reports', reports);


// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
