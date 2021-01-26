module.exports = [
    ['use-babel-config', {
        plugins: ['react-hot-loader/babel']
    },
    {
        module: {
            rules: [{
                test: /\.css$/,
                exclude: /node_modules/,
                include: /src/,
                use: ['style-loader', 'css-loader']
              }]
        }
    }
],
]