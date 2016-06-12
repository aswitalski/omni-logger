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

const addInterceptor = (interceptor) => {
    //interceptors = interceptors.filter(i => i.name !== interceptor.name);
    remove(interceptor);

    // TODO: add something a bit more sophisticated
    interceptors.push(interceptor);

    //console.log(interceptors);

    interceptors.sort((a, b) =>
        a.priority === b.priority ? 0 :
            a.priority < b.priority ? -1 : 1
    );
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