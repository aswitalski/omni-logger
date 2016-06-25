'use strict';

const pluginName = 'Postfix';
const defaultPattern = '( $path )';

const settings = require('../core/settings');
const postProcess = require('../core/post-processor');

/**
 * Adds a postfix at the end of the params array if it's not empty.
 *
 * @param params Params array
 * @param loggerInstance Logger instance
 */
const transform = (/* Array */ params, /* Object */ loggerInstance) => {

    let transformedParams = Array.from(params);
    if (transformedParams.length > 0) {
        const config = settings.getConfig(pluginName);
        transformedParams.push(config || defaultPattern);
    }

    return postProcess(loggerInstance, transformedParams);
};

module.exports = {
    name: pluginName,
    transform,
    defaultPattern,
    priority: 2
};
