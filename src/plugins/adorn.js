'use strict';

const transform = (msg, length, symbol = '-') => {

    //console.log('Transform params:', msg);

    length = (length === undefined ? msg.length : length || 32);
    const separator = new Array(length + 1).join(symbol);
    let prefix = '';
    if (msg.length < length) {
        const spaceCount = parseInt((length - msg.length) / 2);
        prefix = new Array(spaceCount + 1).join(' ');
    }
    return [ `\n${separator}\n${prefix}${msg}\n${separator}\n`];
};

module.exports = {
    name: 'Coloring',
    extensions: {
        adorn: (logger, params) => {
            //console.log(logger);
            logger.log.apply(this, transform(...params));
        }
    },
    priority: 3
};
