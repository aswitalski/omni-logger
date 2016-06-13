'use strict';

const prototype = {};

let interceptors = [];

const configs = {};

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

    interceptors.sort((a, b) =>
        a.priority === b.priority ? 0 :
            a.priority < b.priority ? -1 : 1
    );

    //console.log('Sorted:');
    //console.log(interceptors);
};

const addToPrototype = (key, value) => {
    prototype[key] = value;
};

const addConfig = (key, config) => {
    //console.log('Adding config:', key, config);
    configs[key] = config;
};

const removeConfig = (key, config) => {
    //console.log('Adding config:', key, config);
    configs[key] = config;
};

const getConfig = (key) => configs[key] || {};

module.exports = {
    level: 'info',
    removeInterceptor,
    addInterceptor,
    addToPrototype,
    addConfig,
    getConfig,
    removeConfig,
    interceptors,
    prototype
};