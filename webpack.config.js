const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
