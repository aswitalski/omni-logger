'use strict';

const logger = require('../omnilogger')

// plugins
const coloring = require('../plugins/coloring');
const adorn = require('../plugins/adorn');
const prefix = require('../plugins/prefix');
const postfix = require('../plugins/postfix');

logger.enable();

logger.plugins = {
    coloring,
    adorn,
    prefix,
    postfix
};

window.logger = logger;
