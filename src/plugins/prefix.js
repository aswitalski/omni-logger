'use strict';

const pluginName = 'Prefix';
const defaultPattern = '[ $module ]';

const settings = require('../core/settings');
const postProcess = require('../core/postprocessor');

const transform = (params, loggerInstance) => {

    let transformedParams = Array.from(params);
    if (transformedParams.length > 0) {
        const config = settings.getConfig(pluginName);
        transformedParams.unshift(config || defaultPattern);
    }

    return postProcess(loggerInstance, transformedParams);
};

module.exports = {
    name: pluginName,
    transform,
    defaultPattern,
    extensions: {},
    priority: 2
};
