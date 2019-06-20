module.exports = {
    mode: 'development',
    entry: {
        main: ''
    },
    output: {
        filename: ''
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: 'shader-loader',
                options: {
                    glsl: {
                        chunkPath: './src/glsl-chunks'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts"]
    }
};