// web/webpack.config.js

const path = require("path");
const webpack = require("webpack");

const appDirectory = path.resolve(__dirname, "../");
console.log("app director------->", appDirectory);

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.web.js"),
    path.resolve(appDirectory, "src"),
    path.resolve(appDirectory,"node_modules/react-native"),
    path.resolve(
      appDirectory,
      "node_modules/react-native-keyboard-aware-scroll-view",
    ),
    path.resolve(appDirectory,"node_modules/react-native-elements"),
      path.resolve(appDirectory,"node_modules/react-native-indicators"),
        path.resolve(appDirectory,"node_modules/react-native-material-textfield"),
          path.resolve(appDirectory,"node_modules/@react-native-community"),
          path.resolve(appDirectory,"node_modules/react-native-vector-icons"),
             path.resolve(appDirectory,"node_modules/react-native-ratings"),   
             path.resolve(appDirectory,"node_modules/react-native/Libraries/NewAppScreen")
   // path.resolve(appDirectory, "node_modules/react-native-iphone-x-helper"),
  ],
  //exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-env"],
      // The 'react-native' preset is recommended to match React Native's packager
      // presets: ["react-native"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web", "@babel/plugin-proposal-class-properties"],
    },
  }
};

// This is needed for webpack to import static images in JavaScript files. But takes only 1x dimensions
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

// For loading css in web as in normal react Project
const cssLoaderConfiguration = {
  test: /\.css$/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 1,
        sourceMap: true,
      },
    },
  ],
};
// For loading 3x images(High resolution images ) in react native web
const imageLoader = {
  test: /\.(png|jpe?g|gif)$/,
  loader:
    "react-native-web-image-loader?name=[name].[ext]&scalings[@2x]=2&scalings[-3x]=3",
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, "index.web.js"),
  ],

  // configures where the build ends up
  output: {
    filename: "bundle.web.js",
    path: path.resolve(appDirectory, "dist"),
    globalObject: "this",
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*", // allow Access-Control-Allow-Origin enable for pdf to view
    },
  },
  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
     imageLoaderConfiguration,
      cssLoaderConfiguration,
      imageLoader,
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      "react-native$": "react-native-web",

      // "react-native-image-crop-picker": "react-image-picker"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [".web.js", ".js"],
  },
};
