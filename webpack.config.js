 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 module.exports = {
     entry: './src/app.js',
     output: {
         path: './target/',
         publicPath: 'assets',
         filename: 'app.bundle.js',
     },
     devServer: {
         contentBase: '.',
         headers: {
             'Access-Control-Allow-Origin': '*'
         },
         inline: true,
         watch: true,
         port: 9090,
         progress: true
     },
     resolve: {
         modulesDirectories: ['node_modules']
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                 presets: ['es2015']
             }
         }, {
             test: /\.css$/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
         }]
     },
     plugins: [
         new ExtractTextPlugin('app.bundle.css', {
             allChunks: true
         })
     ]
 }