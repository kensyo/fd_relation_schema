module.exports = {
  context: __dirname + '/app',
  entry: './entry',
  output: {
    path: __dirname + '/docs/javascripts',
    filename: 'bundle.js'
  },
  mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // },
  // resolve: {
  //   fallback: {
  //     buffer: require.resolve('buffer'),
  //     crypto: require.resolve('crypto-browserify'),
  //     stream: require.resolve('stream-browserify')
  //   }
  // }
}
