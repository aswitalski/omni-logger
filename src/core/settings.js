'use strict';

const plugins = {};
const configs = {};

const prototype = {};

const interceptors = [];

/**
 * Removes interceptor by name.
 * @param name Name of the plugin
 */
const removeInterceptor = (/* String */ name) => {
    const index = interceptors.findIndex(element => element.name === name);
    if (index >= 0) {
        interceptors.splice(index, 1);
    }
};

/**
 * Adds the specified interceptor to the chain, removes the previous one
 * with the same name if found and sorts all interceptors by priority.
 *
 * @param interceptor Interceptor
 */
const addInterceptor = (/* Object */ interceptor) => {
    removeInterceptor(interceptor.name);
    interceptors.push(interceptor);
    interceptors.sort((a, b) => a.priority - b.priority);
};

/**
 * Extends all loggers by adding a field to their prototype.
 * @param name Name of the field
 * @param value Extension
 */
const addToPrototype = (/* String */ name, /* Object */ value) => {
    if (prototype[name]) {
        throw new Error(`Logger is already extended with:  + '${name}'`);
    } else {
        prototype[name] = value;
    }
};

/**
 * Adds new config.
 *
 * @param name Name of the plugin
 * @param config Configuration object
 */
const addConfig = (/* String */ name, /* Object */ config) => {
    configs[name] = config;
};

/**
 * Deletes config by name.
 *
 * @param name Name of the plugin
 */
const removeConfig = (/* String */ name) => {
    delete configs[name];
};

/**
 * Returns user plugin config by name.
 *
 * @param name Name of the plugin
 */
const getConfig = (/* String */ name) => configs[name] || {};

/**
 * Returns a copy of the prototype object.
 */
const getPrototype = () => Object.assign({}, prototype);

/**
 * Resets settings by removing all the stored information -
 * plugin definitions, interceptors and user plugin configs.
 */
const reset = () => {
    Object.keys(prototype).map(key => {
        delete prototype[key];
    });
    while (interceptors.length > 0) {
        interceptors.shift();
    }
    Object.keys(configs).map(key => {
        delete configs[key];
    });
};

module.exports = {
    level: 'info',
    interceptors,
    prototype,
    plugins,
    addToPrototype,
    addInterceptor,
    removeInterceptor,
    addConfig,
    getConfig,
    removeConfig,
    getPrototype,
    reset
};