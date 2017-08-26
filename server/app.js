const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

function init(data, sessionSecret) {
    const app = express();
    const router = require('./router');

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));

    app.use('/',
        express.static(path.join(__dirname, '../client'))
    );
    app.use('/node_modules',
        express.static(path.join(__dirname, '../node_modules'))
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    router(app, data);

    return Promise.resolve(app);
}

module.exports = init;
