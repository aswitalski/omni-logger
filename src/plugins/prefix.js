'use strict';

const colors = require('colors/safe');
const settings = require('../settings');

const getTimestamp = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
};

const getPath = () => {
    const lines = new Error().stack.toString().split('\n');
    const lastLoggerIndex = Array.from(lines).reverse().findIndex(line => line.indexOf('logger.js') > 0);
    //console.log(lines);

    if (lastLoggerIndex >= 0) {
        //console.log('Last logger index', lines.length - lastLoggerIndex);
        return lines[lines.length - lastLoggerIndex].match(/\((.+)\)/)[1];
    }
    return '(unknown path)';
};

const transform = (params, loggerInstance) => {
    //console.log(instance);

    const config = settings.getConfig('Prefix');
    let prefix = config || '[ $module ]';

    prefix = prefix.replace(/\$module/g, loggerInstance.module);
    prefix = prefix.replace(/\$timestamp/g, getTimestamp());

    if (prefix.indexOf('$path') >= 0) {
        prefix = prefix.replace(/\$path/g, getPath());
    }

    return params.map((param, index) => {
        if (index === 0) {
            return prefix + ' ' + param;
        } else {
            return param;
        }
    });
};

module.exports = {
    name: 'Prefix',
    transform,
    extensions: {}
};