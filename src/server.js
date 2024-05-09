const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
routes(app);

//menu routes index.js
app.use('/auth', require('../middleware'));

app.listen(3000, () => {
    console.log('server started');
});