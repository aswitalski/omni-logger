'use strict';

const settings = require('../core/settings');
const postprocessor = require('../core/postprocessor');

const transform = (params, loggerInstance) => {

    const config = settings.getConfig('Postfix');

    let transformedParams = Array.from(params);
    if (transformedParams.length > 0) {
        transformedParams.push(config || '[ $module ]');
    }

    return postprocessor(loggerInstance, transformedParams);
};

module.exports = {
    name: 'Postfix',
    transform,
    extensions: {},
    priority: 2
};
