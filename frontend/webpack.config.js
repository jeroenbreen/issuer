const path = require('path');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./../../live"),
        filename: "bundle.js"
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    // https://medium.com/@stefanledin/solve-the-you-are-using-the-runtime-only-build-of-vue-error-e675031f2c50
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, "./src/vue")
                ],
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "./src/vue")
                ],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ['es2015', 'stage-2']}
                }
            }
        ]
    }
};

