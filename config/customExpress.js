const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true })); //recebe dados urlencode form
    app.use(bodyParser.json()); //recebe dados json

    consign().include('controller').into(app);

    return app;
}