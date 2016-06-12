'use strict';

const logger = require('./logger');
const settings = require('./settings');

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
            settings.addInterceptor(createInterceptor(plugin, config));
        }
        if (plugin.extensions) {
            Object.keys(plugin.extensions).map(key => {
                settings.prototype[key] = function (...params) {
                    //console.log('Extension method');
                    //console.log(this);
                    plugin.extensions[key](this, params);
                }
            });
        }
        //console.log('Config:', config);
        if (config !== undefined) {
            settings.addConfig(plugin.name, config);
        }
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