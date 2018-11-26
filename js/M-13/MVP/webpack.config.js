const path = require("path");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const conf = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"  // путь к корню проекта
  },
  module: {
    rules: [
      { test: /\.hbs$/, use: "handlebars-loader", exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          // { loader: "file-loader" }
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              name: "[name].[ext]",
              outputPath: "img/",
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: ExtractCssChunks.loader },
          {
            loader: "css-loader",
            options: {
              modules: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
    new CleanWebpackPlugin("dist", {}),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style.css",
      chunkFilename: "[id].css",
      hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: false // if you use cssModules, this can help.
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html"
    })
  ]
};

module.exports = (env, options) => {
  const production = options.mode === "production";

  conf.devtool = production ? "source-map" : "eval-sourcemap";
  return conf;
};
