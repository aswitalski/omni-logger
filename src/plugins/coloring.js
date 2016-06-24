'use strict';

const colors = require('colors/safe');

const supportsColor = require('supports-color');

const pluginName = 'Coloring';

module.exports = {
    name: pluginName,
    transform: (params, loggerInstance, level, method) => {
        if (supportsColor) {
            return params.map(param => {
                switch (method) {
                    case 'info':
                        return colors.green(param);
                    case 'warn':
                        return colors.yellow(param);
                    case 'error':
                        return colors.red(param);
                    default:
                        return param;
                }
            });
        } else {
            return Array.from(params);
        }
    },
    priority: 10
};
