'use strict';

const assert = require('assert');
const omnilogger = require('../src/omnilogger');

describe('Omnilogger', () => {

    describe('create interceptor', () => {

        it('uses default priority is none specified', () => {

            const transform = () => {};
            const interceptor = omnilogger.createInterceptor({
                name: 'plugin',
                transform
            });
            assert.equal(interceptor.priority, 5);
            assert(interceptor.transform, transform);
        });

        it('uses plugin priority if specified', () => {

            const transform = () => {};
            const interceptor = omnilogger.createInterceptor({
                name: 'plugin',
                transform,
                priority: 7
            });
            assert.equal(interceptor.priority, 7);
            assert(interceptor.transform, transform);
        });

        it('uses config priority if specified', () => {

            const transform = () => {};
            const interceptor = omnilogger.createInterceptor({
                name: 'plugin',
                transform,
                priority: 7
            }, {
                priority: 3
            });
            assert.equal(interceptor.priority, 3);
            assert(interceptor.transform, transform);
        });
    });
});