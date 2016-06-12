'use strict';

const logger = require('../src/omnilogger')
const level = logger.level;
const log = logger.get('demo');

// plugins
const coloring = require('../src/plugins/coloring');
const adorn = require('../src/plugins/adorn');
const prefix = require('../src/plugins/prefix');
const postfix = require('../src/plugins/postfix');

// enabling logger and setting level to debug
logger.enable(level.debug);

logger.plugIn(adorn);
log.adorn('The Ultimate Isomorphic JavaScript Logger', 48, '-');
logger.uninstall(adorn);

log.info('          ... it only is to be ...');
log.info();

logger.plugIn(coloring);

log.info('         ... if it has coloring ...');
log.warn('   ... making it easy to spot a warning ...');
log.error('           ... or AN ERROR ...');

log.info('');
log.log('    ... if it allows to use plugins ...');
log.info('');

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

log.info('This is not logged!');

logger.enable();

log.info();
log.log('>> Logging is back on and this is logged');
log.info();
