'use strict';

const colors = require('colors/safe');

const transform = (params, loggerInstance) => {
    //console.log(instance);
    return params.map((param, index) => {
        if (index === 0) {
            return `[ ${loggerInstance.module} ] ` + param;
        } else {
            return param;
        }
    });
};

module.exports = {
    name: 'Coloring',
    transform,
    extensions: {}
};
