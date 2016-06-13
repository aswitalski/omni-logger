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
    return ({
        name: plugin.name,
        transform: plugin.transform,
        priority: config.priority || plugin.priority || 5,
        config: Object.assign({}, plugin.config, config)
    });
};

const setLevel = (level = levels.info) => {
    settings.level = level
};

const setSelectiveLevel = (...levels) => {
    // TODO: implement me;
};

module.exports = {

    get: (module) => logger.create(module),

    plugIn: (plugin, userConfig) => {

        // TODO: store original plugin object

        if (userConfig !== undefined) {
            settings.addConfig(plugin.name, userConfig);
        }

        if (typeof plugin.transform === 'function') {
            settings.addInterceptor(createInterceptor(plugin, userConfig));
        }

        if (plugin.extensions) {
            Object.keys(plugin.extensions).map(key => {
                settings.addToPrototype(key, function (...params) {
                    plugin.extensions[key](this, params);
                });
            });
        }

    },

    uninstall: (plugin) => {
        settings.removeInterceptor(createInterceptor(plugin));
        settings.removeConfig(plugin.name);

        // TODO: remove methods from prototype
    },

    disable: () => {
        settings.enabled = false;
    },

    enable: (level) => {
        settings.enabled = true;
        if (level) {
            setLevel(level);
        }
    },

    setLevel,
    setSelectiveLevel,
    level: levels,
    createInterceptor
};