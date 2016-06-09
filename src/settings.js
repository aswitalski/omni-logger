'use strict';

const prototype = {};

const interceptors = [];

const addInterceptor = (interceptor) => {
    interceptors.unshift(interceptor);
};

const addToPrototype = (key, value) => {
    prototype[key] = value;
};

module.exports = {
    addInterceptor,
    addToPrototype,
    interceptors,
    prototype
};