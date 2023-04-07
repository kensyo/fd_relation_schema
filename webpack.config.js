module.exports = {
  context: __dirname + '/app',
  entry: './entry',
  output: {
    path: __dirname + '/docs/build',
    filename: 'bundle.js',
  },
  mode: process.env.DEV_ENV ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  devtool: 'eval-source-map',
}
