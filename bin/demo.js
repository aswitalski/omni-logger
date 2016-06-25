'use strict';

const logger = require('../src/omnilogger')
const level = logger.level;
const log = logger.get('demo');

// plugins
const coloring = require('../src/plugins/coloring');
const adorn = require('../src/plugins/adorn');
const prefix = require('../src/plugins/prefix');
const postfix = require('../src/plugins/postfix');

const center = (msg, length = 48) => {
    const indent = Math.floor((length - msg.length) / 2);
    if (indent > 0) {
        return new Array(indent + 1).join(' ') + msg;
    } else {
        return msg;
    }
};

// enabling logger and setting level to debug
logger.enable(level.debug);

logger.plugIn(adorn);
log.adorn('The Ultimate Isomorphic JavaScript Logger', 48, '-');
logger.uninstall(adorn);

if (!logger.supportsColor) {
    logger.warn(center('( Your terminal does not support colors! )'))
}

log.info(center('... it only is to be ...'));
log.info();

logger.plugIn(coloring);

log.info(center('... if it has coloring ...'));
log.warn(center('... making it easy to spot a warning ...'));
log.error(center('... or AN ERROR ...'));

log.info('');

log.log(center('... if it allows to use plugins ...'));

logger.plugIn(adorn);

log.adorn('Some just to adorn logs', 48, '=');

log.log('Some to show extra information, like module:\n');

logger.plugIn(prefix, '[ $module ]');

log.info('Main module');
logger.get('other').warn('Other module');
logger.get('another').error('Yet another module');

log.info();

//logger.plugIn(prefix, '');

//log.log('Or timestamp\n');

logger.plugIn(prefix, '[ $timestamp ]');

log.info('Or timestamp\n');

logger.plugIn(prefix, '[ $timestamp | $module ]');

log.warn('Or both\n');

logger.plugIn(coloring, {
    priority: 1
});
logger.plugIn(prefix, '[ $module ]');

logger.get('also with').info('Main module');
logger.get('no prefix').warn('Other module');
logger.get('coloring').error('Yet another module');

log.log();

logger.uninstall(prefix);
logger.plugIn(postfix, '( $path )');
log.info('It is able to show the REAL line number of the log statement');

logger.uninstall(postfix);

log.log();

logger.plugIn(prefix, '>>> OR ANY <<<');
log.log('other pattern that you need');

logger.uninstall(prefix);

log.info();
log.info('Logging can be disabled and enabled at any time!');

logger.disable();

log.info('This is NOT logged!');

logger.enable();

log.info();
log.log('>> Logging is back on and this is logged');
log.info();
