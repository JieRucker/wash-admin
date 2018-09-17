'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('../config/prod.env');
const api = require('../src/api/apiUrl');
if (process.env.env_config === 'prod') {
  env.api = JSON.stringify(api.build);
} else if (process.env.env_config === 'dev') {
  env.api = JSON.stringify(api.build_dev);
}

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    publicPath: JSON.parse(env.api).staticUrl,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[chunkhash]')
  },
  plugins: [
    new cleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css?v=[contenthash]'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    }),
    new HtmlWebpackPlugin({
      title: '美亚乐洗管理',
      iconfont: '//at.alicdn.com/t/font_733969_icvberhy4fj.css?v=' + new Date().getTime(),
      template: '!!ejs-loader!./src/template/manager.ejs',
      filename: config.build.vmRoot + '/wash/manager.vm',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      title: '登录',
      iconfont: '//at.alicdn.com/t/font_733969_icvberhy4fj.css?v=' + new Date().getTime(),
      template: '!!ejs-loader!./src/template/login.ejs',
      filename: config.build.vmLoginRoot + '/login/login.vm',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'vendor', 'login'],
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets/images'),
        to: 'static/images'
      },
      {
        from: 'src/views/main-components/theme-switch/theme',
        to: 'static/css'
      },
      {
        from: path.resolve(__dirname, '../src/template/refresh.vm'),
        to: config.build.vmRoot + '/frame'
      },
      {
        from: path.resolve(__dirname, '../src/template/refresh.vm'),
        to: config.build.vmLoginRoot + '/frame'
      }
    ])
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
