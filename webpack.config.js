import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from "extract-text-webpack-plugin"
import LessPluginAutoprefix from 'less-plugin-autoprefix';


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
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }, {
                test: /\.(png|svg)(\?.*$|$)/,
                loader: "url-loader"
            }

        ]
    },
    lessLoader: {
        lessPlugins: [
            new LessPluginAutoprefix({browsers: ["last 2 versions"]})
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
};
