const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");  //复制文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //server
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //分离CSS

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
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        { from: "src/img", to: "img" },
        // { from: "src/font", to: "font" },
        // { from: "src/css", to: "css" },
      ],
    }),
    new MiniCssExtractPlugin()
  ],
};