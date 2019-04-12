const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require('path');
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {safe: true}
    }),

  
  ]
});
