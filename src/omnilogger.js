'use strict';

const logger = require('./logger');
const settings = require('./settings');

module.exports = {

    get: (module) => logger.create(module),

    plugIn: (plugin, config) => {
        if (typeof plugin.transform === 'function') {
            plugin.transform.key = plugin.name;
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
        //console.log('Config:', config);
        if (config !== undefined) {
            settings.addConfig(plugin.name, config);
        }
    }
};