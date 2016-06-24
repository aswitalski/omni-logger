'use strict';

const plugins = {};
const configs = {};

const prototype = {};

const interceptors = [];

const removeInterceptor = (interceptor) => {
    const remaining = interceptors.filter(i => i.name !== interceptor.name);
    while (interceptors.length) interceptors.shift();
    remaining.map(i => {
        interceptors.push(i)
    });
};

const addInterceptor = (interceptor) => {
    //interceptors = interceptors.filter(i => i.name !== interceptor.name);
    removeInterceptor(interceptor);

    // TODO: add something a bit more sophisticated
    interceptors.push(interceptor);

    //console.log('Interceptors:');
    //console.log(interceptors);

    interceptors.sort((a, b) => a.priority - b.priority);

    //console.log('Sorted:');
    //console.log(interceptors);
};

const addToPrototype = (key, value) => {
    if (prototype[key]) {
        throw new Error(`Logger is already extended with:  + '${key}'`);
    } else {
        prototype[key] = value;
    }
};

const addConfig = (key, config) => {
    //console.log('Adding config:', key, config);
    configs[key] = config;
};

const removeConfig = (key) => {
    delete configs[key];
};

const getConfig = (key) => configs[key] || {};

const getPrototype = () => Object.assign({}, prototype);

const reset = () => {
    Object.keys(prototype).map(key => {
        delete prototype[key];
    });
    while (interceptors.length) {
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