"use strict";

const path = require(`path`);
const express = require(`express`);
const webpack = require(`webpack`);

const args = require(`minimist`)(process.argv);
const port = args[`p`] || 3000;
const host = args[`h`] || `0.0.0.0`;


const app = express();
const config = require(`./webpack.config.js`);
const compiler = webpack(config);

const serverOptions = {
    hot: true,
    noInfo: false,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
        assets      : false,
        colors      : true,
        version     : false,
        hash        : false,
        timings     : true,
        chunks      : false,
        chunkModules: false
    }
};

app.use(require(`webpack-dev-middleware`)(compiler, serverOptions));
app.use(require(`webpack-hot-middleware`)(compiler));


app.use(`/static`, express.static(`./static`));
app.use(`/dist`, express.static(`./dist`));

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `./dev.html`));
});

app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://` + host + `:` + port);
});
