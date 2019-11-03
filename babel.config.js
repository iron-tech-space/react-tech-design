
module.exports = {
    presets: [
        [
            'env',
            {
                debug: false,
                modules: false,
                useBuiltIns: 'usage',
            },
        ],
        'react',
    ],
    plugins: [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] // `style: true` for less
    ],
};
