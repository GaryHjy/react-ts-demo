const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: './index.html' // webpack打包生成目标的根目录文件
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.(j|t)sx?$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(gif|svg|png|jpg|jpeg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

