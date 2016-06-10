//const LOG = Logger.get('components');
//
//LOG.info();
//
//LOG.instrument(ReactComponent, Logger.reactInstrumentation);

'use strict';

const settings = require('./settings');

const log = (params, level, method, module, instance) => {
    // TODO: check log level settings
    if (!settings.enabled) {
        return;
    }
    const interceptors = settings.interceptors;
    if (interceptors.length === 0) {
        console[method].apply(this, params);
    } else {
        let transformedParams = params;
        interceptors.map(interceptor => {
            transformedParams = interceptor.transform(transformedParams, instance, level, method);
        });
        //console.log(transformedParams);
        console[method].apply(this, transformedParams);
    }
};


module.exports = {
    create: (module) => {
        const instance = Object.create(settings.prototype);
        instance.module = module;
        instance.log = (...params) => log(params, 'info', 'log', module, instance);
        instance.debug = (...params) => log(params, 'debug', 'debug', module, instance);
        instance.info = (...params) => log(params, 'info', 'info', module, instance);
        instance.warn = (...params) => log(params, 'warn', 'warn', module, instance);
        instance.error = (...params) => log(params, 'error', 'error', module, instance);
        return instance;
    }
};