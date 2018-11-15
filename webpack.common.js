const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: ['file-loader'],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            title: 'News Portal',
            template: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
        }),

    ],

};