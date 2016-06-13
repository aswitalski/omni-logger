'use strict';

// TODO: a terrible copy-n-paste - AMEND !!!

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
        const nodePattern = /\((.+)\)/;
        const browserPattern = /.+((file|http)\:\/\/.+)/;
        const line = lines[lines.length - lastLoggerIndex];
        if (line.match(nodePattern)) {
            return line.match(nodePattern)[1];
        } else if (line.match(browserPattern)) {
            return line.match(browserPattern)[1];
        }
    }    return '(unknown path)';
};

const transform = (params, loggerInstance) => {
    //console.log(instance);

    const config = settings.getConfig('Postfix');
    let postfix = config || '[ $module ]';

    postfix = postfix.replace(/\$module/g, loggerInstance.module);
    postfix = postfix.replace(/\$timestamp/g, getTimestamp());

    if (postfix.indexOf('$path') >= 0) {
        postfix = postfix.replace(/\$path/g, getPath());
    }

    return params.map((param, index) => {
        if (index === params.length - 1) {
            return  param + ' ' + postfix;
        } else {
            return param;
        }
    });
};

module.exports = {
    name: 'Postfix',
    transform,
    extensions: {},
    priority: 2
};
