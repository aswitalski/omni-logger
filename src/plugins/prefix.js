'use strict';

const settings = require('../core/settings');
const postprocessor = require('../core/postprocessor');

const transform = (params, loggerInstance) => {

    const config = settings.getConfig('Prefix');

    let transformedParams = Array.from(params);
    if (transformedParams.length > 0) {
        transformedParams.unshift(config || '[ $module ]');
    }

    return postprocessor(loggerInstance, transformedParams);
};

module.exports = {
    name: 'Prefix',
    transform,
    extensions: {},
    priority: 2
};
