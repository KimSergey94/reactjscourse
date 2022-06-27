const path = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const GLOBAL_CSS_REGEXP = /\.global\.less$/;
const DEV_PLUGINS = [ new HotModuleReplacementPlugin(), new CleanWebpackPlugin()];
const COMMON_PLUGINS = [new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`}), new DefinePlugin({'process.env.SERVER': `'${process.env.SERVER}'`})]

function setupDevtool(){
    if(IS_DEV) return 'eval';
    if(IS_PROD) return false;
}

module.exports = {
    watchOptions: {
        ignored: '/dist',
      },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom'
        }
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: [
        path.resolve(__dirname, '../src/client/index.jsx'),
        'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr'
    ],
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js',
        publicPath: '/static/',
    },
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
                    loader: 'style-loader', 
                },
                {
                    loader: 'css-loader',
                    options: { 
                        //включим настройки модуля лоадера
                        modules: {
                            //включит локальные селекторы
                            mode: 'local',
                            //как будет называться новый селектор
                            localIdentName: '[name]__[local]--[hash:base64:5]'
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
            test: GLOBAL_CSS_REGEXP,
            use: ['style-loader', 'css-loader']
        }
    ]
    },
    devtool: setupDevtool(),
    plugins: IS_DEV ? DEV_PLUGINS.concat(COMMON_PLUGINS) : COMMON_PLUGINS,
};