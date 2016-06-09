//const LOG = Logger.get('components');
//
//LOG.info();
//
//LOG.instrument(ReactComponent, Logger.reactInstrumentation);

'use strict';

const settings = require('./settings');

const log = (params, level, method, module, instance) => {
    const interceptors = settings.interceptors;
    if (interceptors.length === 0) {
        console[method].apply(this, params);
    } else {
        let transformedParams = params;
        interceptors.map(transform => {
            transformedParams = transform(transformedParams, instance, level, method);
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
        instance.error = (...params) => {

            console.log();

            //try {
            //    throw new Error();
            //} catch (e) {
            //    console.log('Stack trace');
            //    console.log(e.stack);
            //}
            //log(params, 'error', 'error', module, instance);
        }
        return instance;
    }
}