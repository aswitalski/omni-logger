'use strict';

const colors = require('colors/safe');

module.exports = {

    name: 'Coloring',

    transform: (params, loggerInstance, level, method) => {
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
    },

    extensions: {},

    priority: 10
};
