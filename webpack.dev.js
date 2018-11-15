const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        before: (app, server) => {
            server._watch(`app/**.html`); //for html hot reload
        },
        contentBase: path.join(__dirname, "dist"),
        hot: true, // don't need HMR plugin if in package json --hot is defined
        overlay: true,
        watchContentBase: true //doesn't help with html
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
});