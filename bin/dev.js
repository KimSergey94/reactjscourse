const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');

const compiler = webpack(webpackConfig);


// const watching = compiler.watch({
//     // Example [watchOptions](/configuration/watch/#watchoptions)
//     aggregateTimeout: 300,
//     poll: undefined
//   }, (err, stats) => { // [Stats Object](#stats-object)
//     // Print watch/build result here...
//     console.log(stats);
//   });


    compiler.watch({}, (err) => {
        if(err) {
            console.log('Compilation failed: ', err);
        }
        console.log('Compilation was successfully completed.');
    });

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, '../dist/server'),
            path.resolve(__dirname, '../dist/client')
        ]
    })


// compiler.run((err) => {
//     if(err) {
//         console.log('Compilation failed: ', err);
//     }

//     compiler.watch({}, (err) => {
//         if(err) {
//             console.log('Compilation failed: ', err);
//         }
//         console.log('Compilation was successfully completed.');
//     });

//     nodemon({
//         script: path.resolve(__dirname, '../dist/server/server.js'),
//         watch: [
//             path.resolve(__dirname, '../dist/server'),
//             path.resolve(__dirname, '../dist/client')
//         ]
//     })
// });
