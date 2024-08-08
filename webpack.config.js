const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

module.exports = {
entry: "./src/index.js",
output: { 
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: '/'
}, 
mode: 'development',
plugins: [htmlPlugin],
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /.(css|scss)$/,
      exclude: [/node_modules/, /client\/stylesheets\/modules/],
      use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
      use: [
        {
          // loads files as base64 encoded data url if image file is less than set limit
          loader: 'url-loader',
          options: {
            // if file is greater than the limit (bytes), file-loader is used as fallback
            limit: 8192,
          },
        },
      ],
    },
   ]
 },
devServer: {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  historyApiFallback: true,
  port: 8080,
  proxy: [
    {
      context: ['/api/**'],
      target: 'http://localhost:3000'
    }
  ]
},

 resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};