/**
 * Created on the basis of https://github.com/dceddia/create-react-app-customized
 * https://blog.bitsrc.io/how-to-develop-microfrontends-using-react-step-by-step-guide-47ebb479cacd
 */

const rewire = require('rewire');

const script = process.argv[2];

const overrides = {
    development: require('./config-overrides.dev'),
    production: require('./config-overrides.dev'),
    // production: require('./config-overrides.prod'),
}

const scripts = {
    start: (script) => {
        // Get webpack config generation function
        let configFactory = script.__get__('configFactory');

        // Override configFactory
        script.__set__('configFactory', (webpackEnv) => {
            return overrides[webpackEnv]({...configFactory(webpackEnv)})
        });
    },
    build: (script) => {
        // Get webpack config
        let config = script.__get__('config');

        // Upgrade webpack config
        config = overrides['production']({...config})

        // Override webpack config
        script.__set__('config', config);
    }
}

if(['build', 'start'].includes(script)){
    // Get script from react-scripts
    let defaultScript = rewire(`react-scripts/scripts/${script}.js`);

    // Run script
    scripts[script](defaultScript);
} else {
    console.log('Unknown script "' + script + '".');
}
