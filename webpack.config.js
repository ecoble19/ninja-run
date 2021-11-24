const path = require('path');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    "mode": "none",
    "entry": {
        bundle: "./src/index.js",
        //"bundle.min": "./src/index.js",
    },
    devtool: "source-map",
    "output": {
        "path": __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Product Wars',
            template: "src/index.html",
            filename: "index.html"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/
        })]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
}