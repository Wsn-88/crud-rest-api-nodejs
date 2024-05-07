const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//panggil routes
routes(app);

app.listen(3000, () => {
    console.log('server started');
});