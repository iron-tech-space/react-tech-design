// config-overrides.dev
module.exports = (config) => {

    const lessRule = {
        test: /\.(less)$/,
        use: [{
            loader: 'style-loader', // creates style nodes from JS strings
        }, {
            loader: 'css-loader' // translates CSS into CommonJS
        }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true,
                },
            },
        }]
    }
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    const resourceLoaderIndex = oneOfRule.oneOf.findIndex(
        ({ type }) => type === "asset/resource"
    );
    oneOfRule.oneOf.splice(resourceLoaderIndex, 0, lessRule);

    // console.log('config => ', config)
    return {...config};
}
