const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        before: (app, server) => {
            server._watch(`app/**.html`);
        },
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        overlay: true,
        watchContentBase: true,
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