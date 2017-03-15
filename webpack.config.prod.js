const path    = require('path');
// const fs      = require('fs');
const webpack = require('webpack');
const config = {
    context : __dirname,
    cache: true,
    entry   : {
        main: [
            // 'webpack-hot-middleware/client', // + '?path=http://' + host + ':' + port + '/__webpack_hmr',
            './index.js'
        ],
        vendors: [
            `babel-polyfill`,
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'lodash',
            'classnames',
            `seamless-immutable`,
            `humps`,
            'react-timeout',
            'react-addons-pure-render-mixin'
        ]
    },
    output: {
        path         : path.join(__dirname, 'static', 'js'),
        publicPath   : '/static/wl/',
        filename     : '[name].js',
        chunkFilename: '[id].chunk.js',
        pathinfo     : true
    },
    module: {
        loaders: [
            {
                test   : /\.js$/,
                loader : `babel-loader`,
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: [`vendors`],
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __PRODUCTION__: true,
            __DEVTOOLS__: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences   : true,
                booleans    : true,
                loops       : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        })
    ]
};

module.exports = config;
