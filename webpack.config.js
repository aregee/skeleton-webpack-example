const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_SHELL_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devtool = 'source-map';

const entry = {
  skeleton: __dirname + '/index.js',
  // editor: './modules/editor.js',
  'common-dependencies': [
    'mithril',
    // 'skeletonpwa',
    /* Just one version of react, too. react-router is fine to have multiple versions of,
     * though, so no need to put it in common dependencies
     */
    'polythene-css',
    'polythene-mithril',
    'marked',
    'react',
    'react-dom'
  ],
};

const output = {
  path: path.resolve('./bundle/public'),
  filename: `[name].js`,
  chunkFilename: '[name].bundle.js',
  publicPath: '/bundle/public/'
};

function getBabelConfig() {
  return {
    presets: [
      'env',
      'react', ['babel-preset-env', {
        targets: {
          "browsers": ["last 2 versions"],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
    ],
  };
};

const modules = {
  loaders: [{
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader?limit=10000'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: getBabelConfig()
    }
  ]
};

const plugins = [
  new CopyPlugin([{
      from: path.resolve(__dirname, './manifest.json'),
      to: '.'
    },
    {
      from: path.resolve(__dirname, './sw.js'),
      to: '.'
    },
    {
      from: path.resolve(__dirname, './assets'),
      to: '.'
    }
  ]),
  new webpack.optimize.ModuleConcatenationPlugin()
];


const devServer = {
  compress: true,
  historyApiFallback: true,
  stats: 'minimal',
  disableHostCheck: true
};

// Production configs and setup
if (isProd) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_SHELL_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common-dependencies',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
    // new BundleAnalyzerPlugin()
  );
}

module.exports = {
  devtool,
  entry,
  output,
  module: modules,
  plugins
};
