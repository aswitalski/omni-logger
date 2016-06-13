'use strict';

const logger = require('./core/logger');
const settings = require('./core/settings');

const levels = {
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error'
};

const createInterceptor = (plugin, config = {}) => {
    //console.log('Plugin:', plugin);
    //console.log('Config:', config);
    return ({
        name: plugin.name,
        transform: plugin.transform,
        priority: config.priority || plugin.priority || 5,
        config: Object.assign({}, plugin.config, config)
    });
};

module.exports = {

    get: (module) => logger.create(module),

    plugIn: (plugin, config) => {
        if (typeof plugin.transform === 'function') {
            //plugin.transform.key = plugin.name;
            //console.log('--> adding interceptor')
            settings.addInterceptor(createInterceptor(plugin, config));
        }
        if (plugin.extensions) {
            Object.keys(plugin.extensions).map(key => {
                settings.addToPrototype(key, function (...params) {
                    //console.log('Extension method');
                    //console.log(this);
                    plugin.extensions[key](this, params);
                });
            });
        }
        //console.log('Config:', config);
        if (config !== undefined) {
            settings.addConfig(plugin.name, config);
        }
    },

    uninstall: (plugin) => {
        settings.removeInterceptor(createInterceptor(plugin));
        settings.removeConfig(plugin.name);
    },

    disable: () => {
        settings.enabled = false;
    },

    enable: (level) => {
        settings.enabled = true;
        if (level) {
            settings.level = level;
        }
    },

    level: levels,
    createInterceptor
};