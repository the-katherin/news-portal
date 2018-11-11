const path = require('path');
// const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "app"), // concatenate dir(absolute path) with app
    entry: {
        app: './app.js' // source relatevely to context
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: ['file-loader'],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            title: 'News Portal',
            template: 'index.html' //!!obligatory if our html isn't at root directory
        }),

        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
        }),

        // new CopyWebpackPlugin([
        //     { from: './index.html', to: './[name].[ext]' },
        // ]),
    ],

};