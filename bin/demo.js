var logger = require('../src/omnilogger')

var log = logger.get('demo');

var coloring = require('../src/plugins/coloring');
var adorn = require('../src/plugins/adorn');
const prefix = require('../src/plugins/prefix');

log.info('The Ultimate Isomorphic JavaScript Logger');
log.info();
log.info('        ... it only is to be ...');
log.info();

logger.plugIn(coloring);

log.info('       ... if it has coloring ...');
log.warn('... making it easy to spot a warning ...');
log.error('         ... or AN ERROR ...');

log.info('');
log.log('  ... if it allows to use plugins ...');
log.info('');

logger.plugIn(adorn);

log.adorn('Some just to adorn logs', 40);

log.log('Some to show useful information, like module names:\n');

logger.plugIn(prefix, '[ $module ]');

log.info('Main module');
logger.get('other').warn('Other module');
logger.get('another').error('Yet another module');

log.info();