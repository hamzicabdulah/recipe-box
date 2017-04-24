var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'scripts') + '/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(node_modules)/',
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    ]
  }
};
