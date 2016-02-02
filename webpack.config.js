import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from "extract-text-webpack-plugin"


export default {
    entry: [
        'webpack-hot-middleware/client',
        './client'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)?/,
                loader: 'babel',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    presets: ['stage-0', 'react', 'es2015']
                }
            }, {
                test: /\.css?/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
};