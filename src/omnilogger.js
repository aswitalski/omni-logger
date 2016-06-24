'use strict';

const logger = require('./core/logger');
const settings = require('./core/settings');
const supportsColor = require('supports-color');

const levels = {
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error'
};

const install = (plugin, userConfig) => {

    settings.plugins[plugin.name] = plugin;

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
};

const uninstall = (plugin) => {

    const registeredPlugin = settings.plugins[plugin.name];

    settings.removeInterceptor(createInterceptor(registeredPlugin));
    settings.removeConfig(plugin.name);

    if (registeredPlugin.extensions) {
        Object.keys(registeredPlugin.extensions).map(key => {
            delete settings.prototype[key];
        });
    }

    // TODO: remove methods from prototype
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
    // TODO: implement me
};

module.exports = {

    get: (module) => logger.create(module),

    install,
    plugIn: install, // alias

    uninstall,

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
    createInterceptor,
    supportsColor
};