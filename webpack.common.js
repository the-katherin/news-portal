const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, "app"),
    entry: {
        app: './main.js'
    },

    output: {
        filename: '[name].bundle.js',
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
                                {
                                    targets: {
                                        'browsers': 'last 2 versions',
                                        'ie': '11',
                                    },
                                    useBuiltIns: 'usage',
                                }
                            ]
                        ]
                    }
                }
            },

            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: ['file-loader'],
            },
        ],
    },

    resolve: {
        modules: ['node_modules'],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',
        }),

        new HtmlWebpackPlugin({
            title: 'News Portal',
            template: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
        }),

    ],

};