'use strict';

const pluginName = 'Postfix';
const defaultPattern = '( $path )';

const settings = require('../core/settings');
const postprocessor = require('../core/postprocessor');

const transform = (params, loggerInstance) => {

    const config = settings.getConfig(pluginName);

    let transformedParams = Array.from(params);
    if (transformedParams.length > 0) {
        transformedParams.push(config || defaultPattern);
    }

    return postprocessor(loggerInstance, transformedParams);
};

module.exports = {
    name: pluginName,
    transform,
    defaultPattern,
    extensions: {},
    priority: 2
};
