
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const returnObj = {
    launch,
};



function launch() {
    const app = express();

    // Express app config
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(function (req, res, next) {
        var ip = req.clientIp;
        res.set({
            'request-ip': ip
        })
        req.clientIP = ip;
        next();
    });
    //Initialize the app routes
    const routes = require('./routes');
    app.use('/', routes);


    // Run the app by serving the static files in the dist directory
    app.use(express.static(`${__dirname}/../../dist`));

    // For all GET requests, send back index.html
    // so that PathLocationStrategy can be used
    app.get('/*', (req, res) => {
        res.sendFile(path.join(`${__dirname}/../../dist/index.html`));
    });

    return app;
}

module.exports = returnObj;
