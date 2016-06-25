'use strict';

const pluginName = 'Prefix';
const defaultPattern = '[ $module ]';

const settings = require('../core/settings');
const postProcess = require('../core/post-processor');

/*
 * Adds a prefix at the beginning of the params array if it's not empty.
 *
 * @param params Params array
 * @param loggerInstance Logger instance
 */
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
    priority: 2
};
