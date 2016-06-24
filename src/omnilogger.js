'use strict';

const logger = require('./core/logger');
const settings = require('./core/settings');
const supportsColor = require('supports-color');

/**
 * Supported logging levels.
 */
const levels = {
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error'
};

/**
 * Installs given plugin with custom user config.
 *
 * @param plugin Plugin definition
 * @param userConfig User config
 */
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

/**
 * Removes specified plugin if already installed.
 *
 * @param plugin Plugin definition or name
 */
const uninstall = (plugin) => {

    const pluginName = typeof plugin === 'object' ? plugin.name : plugin;
    const installedPlugin = settings.plugins[pluginName];

    if (installedPlugin) {

        settings.removeInterceptor(pluginName);
        settings.removeConfig(pluginName);

        if (installedPlugin.extensions) {
            Object.keys(installedPlugin.extensions).map(key => {
                delete settings.prototype[key];
            });
        }
    }
};

/**
 * Creates an interceptor object.
 *
 * @param plugin Plugin definition
 * @param config Custom user config
 */
const createInterceptor = (plugin, config = {}) => {
    return ({
        name: plugin.name,
        transform: plugin.transform,
        priority: config.priority || plugin.priority || 5,
        config: Object.assign({}, plugin.config, config)
    });
};

/**
 * Sets specified level, defaults to INFO.
 *
 * @param level Logging level
 */
const setLevel = (level = levels.info) => {
    settings.level = level
};

/**
 * Sets logging levels selectively.
 *
 * @param levels Logging levels to use
 */
const setSelectiveLevel = (...levels) => {
    // TODO: implement exclusionary level selection
};

module.exports = {

    get: (module) => logger.create(module),

    install,
    plugIn: install,

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