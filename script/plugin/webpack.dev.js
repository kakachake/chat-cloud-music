const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseDir = path.resolve(__dirname, '../../')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(baseDir, 'client/plugin/src/main.tsx')
  },
  output: {
    filename: 'cloudMusicChat.js',
    path: path.resolve(baseDir, 'dist/plugin'),
    library: {
      name: 'cloudMusicChat',
      type: 'umd'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'css', 'less']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()].filter(Boolean)
              }),
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css|\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
                auto: /\.module\.\w+$/i
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template:
        'D://project/github/cloud_music_monorepo/packages/project/build/index.html'
    }),
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 3030,
    static: {
      directory: path.join(
        'D://project/github/cloud_music_monorepo/packages/project/build'
      )
    }
  }
}
