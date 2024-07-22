const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "index.html",
    }),
  ],

  devServer: {
    client: {
      overlay: true,
      progress: true,
    },
    compress: true,
    hot: true,
    open: true,
    port: 3100,
  },
};
