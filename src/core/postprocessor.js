'use strict';

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
        const browserPattern = /.+((file|http):\/\/.+)/;
        const line = lines[lines.length - lastLoggerIndex];
        if (line.match(nodePattern)) {
            return line.match(nodePattern)[1];
        } else if (line.match(browserPattern)) {
            return line.match(browserPattern)[1];
        }
    }
    return '(unknown path)';
};

const process = (loggerInstance, params) => {

    //console.log('2 Params:', params);
    //console.log('2 Logger instance:', loggerInstance);

    return params.map(param => {
        if (typeof param === 'string') {

            let result = param;

            result = result.replace(/\$module/g, loggerInstance.module);
            result = result.replace(/\$timestamp/g, getTimestamp());

            if (result.indexOf('$path') >= 0) {
                result = result.replace(/\$path/g, getPath());
            }

            return result;

        } else {
            return param;
        }
    })


};

module.exports = process;
