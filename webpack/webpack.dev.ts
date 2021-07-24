import merge from 'webpack-merge';
import common from './webpack.common';

import * as Webpack from 'webpack';

import HTMLWebpackPlugin from 'html-webpack-plugin';

import * as path from 'path';

const config = merge(common, {
    mode: `development`,
    devtool: `source-map`,

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    `style-loader`,
                    `css-loader`,
                    `sass-loader`
                ]
            },
            {
                test: /\.css$/,
                use: [`style-loader`, `css-loader`]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, `../public/index.html`)
            // favicon: `./public/assets/img/logos/favicon.png` // NOTE: This has to be a relative path from root.
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],

    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: `bundle.min.js`
    },

    devServer: {
        contentBase: path.resolve(__dirname, `../public`),
        historyApiFallback: true,
        port: 3000,
        publicPath: `http://localhost:3000`,
        hotOnly: true
    }
});

export default config;
