const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  devServer: {
    static: './build',
    watchFiles: [ './src/index.html'],
    hot: true,
  },
  entry: [
    './src/js/index.js',
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|hdr)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MMOOFUN',
      template: 'src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/obj", to: "obj" },
        // { from: "src/three", to: "three" },
        { from: "src/img", to: "img" },
        { from: "src/font", to: "font" },
        { from: "src/css", to: "css" },
      ],
    }),
  ],
};