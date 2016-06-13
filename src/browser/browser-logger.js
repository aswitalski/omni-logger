'use strict';

const logger = require('../omnilogger');

logger.plugins = {
    coloring: require('../plugins/coloring'),
    adorn: require('../plugins/adorn'),
    prefix: require('../plugins/prefix'),
    postfix: require('../plugins/postfix')
};

logger.enable();

window.logger = logger;
