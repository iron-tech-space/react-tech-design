
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
        "stage-0",
        'react',
    ],
    // plugins: [
    //     ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] // `style: true` for less
    // ],
};
