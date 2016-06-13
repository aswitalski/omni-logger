'use strict';

const pluginName = 'Adorn';

const transform = (msg, length, symbol = '-') => {
    length = (length === undefined ? msg.length : length || 32);
    const separator = new Array(length + 1).join(symbol);
    let prefix = '';
    if (msg.length < length) {
        const spaceCount = parseInt((length - msg.length) / 2);
        prefix = new Array(spaceCount + 1).join(' ');
    }
    return [`\n${separator}\n${prefix}${msg}\n${separator}\n`];
};

module.exports = {
    name: pluginName,
    extensions: {
        adorn: (loggerInstance, params) => {
            loggerInstance.log.apply(this, transform(...params));
        }
    },
    priority: 3
};
