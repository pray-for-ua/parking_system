const path    = require('path');
const webpack = require('webpack');

const args = require('minimist')(process.argv);
const devTools = args['d'];
const reduxLogger = args[`rlg`];

const config = {
    context : __dirname,
    cache: true,
    devtool : 'source-map',
    entry   : {
        main: [
            'webpack-hot-middleware/client',
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
            'react-timeout'
        ]
    },
    output: {
        path         : path.join(__dirname, 'dist'),
        publicPath   : '/assets/',
        filename     : '[name].js',
        chunkFilename: '[id].chunk.js',
        pathinfo     : true
    },
    module: {
        // noParse: [
        //     /.*node_modules.*[\\\/](barcode)/
        // ],
        loaders: [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'vendors',
            filename : 'vendors.js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            fetch  : 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
            __WL__: false,
            __DEVELOPMENT__: true,
            __REDUX_LOGGER__: JSON.parse(reduxLogger || false),
            __PRODUCTION__: false,
            __DEVTOOLS__: JSON.parse(devTools || false)
        })
    ]
};

module.exports = config;
