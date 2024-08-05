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
    filename: "bundle.js"
}, 
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
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
   ]
 },
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
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