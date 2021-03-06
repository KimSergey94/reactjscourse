const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {DefinePlugin} = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.less$/;
const IS_DEV = NODE_ENV === 'development';

module.exports = {
    target: "node",
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, '../src/server/server.js'),
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    externals: [nodeExternals()],
    module: {
        rules: [
        {
            test: /\.[tj]sx?$/,
            exclude: /node_modules/,
            use: ['ts-loader']
        },
        {    
            test: /\.less$/,
            use: 
            [ 
                {
                    loader: 'css-loader',
                    options: { 
                            //включит настройки модуля лоадера
                            modules: {
                                //включит локальные селекторы
                                mode: 'local',
                                //как будет называться новый селектор
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                exportOnlyLocals: true
                            }
                        }
                },
                {
                    loader: 'less-loader',
                }
            ],
            exclude: GLOBAL_CSS_REGEXP
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: ['file-loader']
        },
        {
            test: GLOBAL_CSS_REGEXP,
            use: ['css-loader']
        }]
    },
    optimization: {
      minimize: false,
    },
    devtool: IS_DEV ? 'eval' : false,
    plugins: [new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`}), new DefinePlugin({'process.env.SERVER_URL': `'${process.env.SERVER_URL}'`}), new DefinePlugin({'process.env.CLIENT_PWD': `'${process.env.CLIENT_PWD}'`})]
};