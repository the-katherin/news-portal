const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, "app"),
    entry: {
        index: './index.js',
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                // {
                                //     useBuiltIns: 'usage', has issues with IE11 and dynamic-import
                                // }
                            ]
                        ],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: ['url-loader'],
            },

            {
                test: /\.json$/,
                type: 'javascript/auto', // without it an error occurs
                use: [
                    { loader:  'raw-loader'},
                    {
                        loader:  'json-delete-numeric-attributes-loader',
                        options: {
                            'regularExpression': /^\d+$/
                        }
                    }
                ]
            },
        ],
    },

    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ],
    },

    plugins: [

        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',
        }),

        new HtmlWebpackPlugin({
            title: 'News Portal',
            template: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: "[id].css",
        }),

    ],

};
