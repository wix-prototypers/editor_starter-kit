const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const topBarCss = new ExtractTextWebpackPlugin("top-bar.css");

module.exports = {
  entry: "./src/App.js",
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "editor.js",
  },

  module: {
    rules: [
      {
        test: /\*.css/i,
        use: topBarCss.extract({
          use: "css-loader",
        }),
      },
    ],
  },
  plugins: [new ExtractTextWebpackPlugin("editor.css")],
};
