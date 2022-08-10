const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/firebase.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      }
    ]
  }
};