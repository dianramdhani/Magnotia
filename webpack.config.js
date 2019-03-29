const path = require('path');

const app = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [
                'html-loader'
            ]
        }]
    }
};

module.exports = [app];