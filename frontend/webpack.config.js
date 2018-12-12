const path = require('path');



module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './../../live'),
        filename: 'bundle.js'
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@components': path.resolve('src/vue/components'),
            '@models': path.resolve('src/vue/store/models'),
            '@store': path.resolve('src/vue/store'),
            '@styles': path.resolve('src/styles'),
            '@mixins': path.resolve('src/vue/mixins'),
            '@root': path.resolve('src'),
            '@tools': path.resolve('src/vue/tools')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, './src/vue')
                ],
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, './src/vue')
                ],
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

