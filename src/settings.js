'use strict';

const prototype = {};

let interceptors = [];

const configs = {};

const remove = (interceptor) => {
    const remaining = interceptors.filter(i => i.name !== interceptor.name);
    while (interceptors.length) interceptors.shift();
    remaining.map(i => {
        interceptors.push(i)
    });
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

const addInterceptor = (plugin, config) => {
    const interceptor = createInterceptor(plugin, config);
    //interceptors = interceptors.filter(i => i.name !== interceptor.name);
    remove(interceptor);

    // TODO: add something a bit more sophisticated
    interceptors.push(interceptor);

    //console.log(interceptors);

    interceptors.sort((a, b) =>
        a.priority === b.priority ? 0 :
            a.priority < b.priority ? -1 : 1);
};

const addToPrototype = (key, value) => {
    prototype[key] = value;
};

const addConfig = (key, config) => {
    //console.log('Adding config:', key, config);
    configs[key] = config;
};

const getConfig = (key) => configs[key] || {};

module.exports = {
    level: 'info',
    addInterceptor,
    addToPrototype,
    addConfig,
    getConfig,
    interceptors,
    prototype
};