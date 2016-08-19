var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // Thq:e build chapter contains an example of the latter.
  entry: [ 
    PATHS.src + '/index.js'
  ],

  output: {
    path: PATHS.build,
    filename: 'main.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-0']
        }
      }, // to transform JSX into JS
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader') 
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },

  // webpack dev server configuration
  devtool: 'eval-source-map',
  devServer: {
    contentBase: PATHS.build,

    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,

    // proxy ajax api
    // proxy: {
    //   '/maps/api/*': {
    //     target: process.env.MOCK_SERVER || 'https://maps.googleapis.com',
    //     secure: false
    //   }
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('main.css')
  ]
};