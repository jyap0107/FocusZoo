const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'development',
  entry: {
      popup: './src/popup.js',
      foreground: './src/foreground.js',
      // Add other files if they exist
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true, 
    // Turn entry files into filename and directory as specified
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/, //Runs/loads files of these types. Transforms React to something webpackbuilder can understand
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader', // Babel turns React to Javascript for webpack
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    }, {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }
      ]
    }
  ],
  }, 
  // So manifest and popup.html appear in dist
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup.html',
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/alert.html',
      filename: 'alert.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/foreground.html',
      filename: 'foreground.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" },
        { from: 'src/inject_foreground.js'},
        { from: 'src/background.js'},
        { from: 'src/manifest.json'},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "popup.css"
    }),
    new MiniCssExtractPlugin({
      filename: "options-collection.css"
    })
  ],
  // mode: '',
  // Send an object and resultant name
};