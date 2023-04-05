const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  target: "web",
  entry: ["./src/index.ts"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: { usedExports: true },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    host: "127.0.0.1",
    port: 8090,
    historyApiFallback: true,
  },
  watchOptions: { ignored: "/node_modules" },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|ttf|eot|woff2|woff)$/i,
        use: ["url-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: [".tsx", ".ts", "js"],
    }),
  ],
};
