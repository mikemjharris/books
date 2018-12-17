const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: {
    entry: './index.js',
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./style.css"
    }),
    new webpack.EnvironmentPlugin([
        'NODE_ENV',
    ]),
  ],
};
