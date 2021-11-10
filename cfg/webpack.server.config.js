const path = require('path');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;

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
            use: ['ts-loader']
        },
        {    
            test: /\.less$/,
            use: [ 
                {
                    loader: 'css-loader',
                    options: { 
                            //включит настройки модуля лоадера
                            modules: {
                                //включит локальные селекторы
                                mode: 'local',
                                //как будет называться новый селектор
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            },
                            //css-loader не собирал стили на сервер глобально - нужен только селектор
                            onlyLocals: true
                        }
                },
                'less-loader',
            ]
        }
    ]
    },
      optimization: {
        minimize: false,
      }
};