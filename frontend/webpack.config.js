const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const root = `${__dirname}/src`;
const dist = `${__dirname}/dist`;
const paths = {
  app: `${root}/app/app.module.js`,
  styles: `${root}/styles`,
  static: {
    index: `${root}/index.html`,
    images: `${root}/images`
  },
};

// Plugins
const prep = {
  clean: new cleanPlugin([
    dist,
  ]),
  copy: new copyPlugin([{
    from: paths.static.index,
  }, {
    from: paths.static.images,
    to: 'images/',
    // flatten: true,
  }]),
};

const extract = {
  styles: new ExtractTextPlugin('css/styles.css'),
};

// Loaders
const scripts = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    'ng-annotate-loader',
    'babel-loader',
  ],
};

const css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader', 
    loader: 'css-loader'
  })
  // loader: extractPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
};

const sass = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader', 
    loader: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          includePaths: [paths.styles],
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function() {
            return [autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})];
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [paths.styles],
        }
      }
    ]
  })  
  // loader: extractPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
};

const markup = {
  test: /\.html$/,
  // loader: 'ngtemplate!html',
  use: [
    'ngtemplate-loader',
    'html-loader'  
  ]
};

const fonts = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader?name=fonts/[name].[ext]',
};

// Config object
const config = {
  entry: {
    bundle: paths.app,
  },
  devtool: 'source-map',
  module: {
    rules: [
      scripts,
      css,
      sass,
      markup,
      fonts,
    ],
  },
  plugins: [
    prep.clean,
    prep.copy,
    extract.styles,
  ],
  output: {
    path: `${dist}/`,
    publicPath: '/',
    filename: 'js/app.[name].js',
  },
  devServer: {
    contentBase: `${dist}/`,
    inline: true,
    https: false,
    open: true,
    port: 8080,
    historyApiFallback: true,
    progress: true, // show status of my build
    colors: true
  },
};

module.exports = config;
