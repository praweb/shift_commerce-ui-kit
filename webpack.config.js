const webpack = require('webpack')
const path = require('path')

const config = {
  entry: ['./index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpg|ttf|otf|eot|woff(2)?)$/,
        loader: "file-loader"
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: process.env.NODE_ENV === 'development',
      API_HOST: JSON.stringify(process.env.API_HOST)
    })
  ]
}

if(process.env.NODE_ENV === 'development'){

  config.devServer = {
    port: process.env.PORT || 3000,
    compress: true
  }

}

module.exports = config
