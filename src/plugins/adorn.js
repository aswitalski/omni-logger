'use strict';

const transform = (msg, length) => {
    length = (length === undefined ? msg.length : length || 32);
    const separator = new Array(length + 1).join('-');
    let prefix = '';
    if (msg.length < length) {
        const spaceCount = parseInt((length - msg.length) / 2);
        prefix = new Array(spaceCount + 1).join(' ');
    }
    return [ `${separator}`, `\n${prefix}${msg}`, `\n${separator}\n`];
};

module.exports = {
    name: 'Coloring',
    extensions: {
        adorn: (logger, params) => {
            //console.log(logger);
            logger.log.apply(this, transform(...params));
        }
    }
};
