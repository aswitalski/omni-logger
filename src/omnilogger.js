'use strict';

const logger = require('./logger');
const settings = require('./settings');

module.exports = {
    get: (module) => logger.create(module),
    plugIn: (plugin) => {
        if (typeof plugin.transform === 'function') {
            settings.addInterceptor(plugin.transform);
        }
        if (plugin.extensions)  {
            Object.keys(plugin.extensions).map(key => {
               settings.prototype[key] = function(...params) {
                   //console.log('Extension method');
                   //console.log(this);
                   plugin.extensions[key](this, params);
               }
            });
        }
    }
};