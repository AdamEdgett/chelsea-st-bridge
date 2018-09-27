const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname,

  entry: [
    "react-hot-loader/patch",
    "babel-polyfill",
    "whatwg-fetch",
    "./src/index.js",
    './src/styles/app.less',
  ],

  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          /node_modules/,
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-hot-loader/babel"],
        },
      },

      {
        test: /\.ts(x?)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["react-hot-loader/babel"],
            },
          },
          "ts-loader"
        ],
      },

      {
        test: /\.less/,
        include: [path.resolve(__dirname, "src/styles")],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ]
      }
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/styles'),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.json'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.ejs",
    })
  ],

  devtool: "source-map",

  devServer: {
    contentBase: "./public",
    host: "0.0.0.0",
    port: "8080",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
    compress: true,
    inline: true,
    hot: true,
    hotOnly: true,
  }
};
