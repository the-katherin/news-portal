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
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../configs')
                            }
                        }
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ]
    }
});