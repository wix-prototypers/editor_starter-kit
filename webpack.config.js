const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/App.js",
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "editor.js",
  },

  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};
