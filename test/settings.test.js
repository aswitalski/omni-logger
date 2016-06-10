'use strict';

const assert = require('assert');
const settings = require('../src/settings');

describe('Settings', () => {

    describe('Add interceptor', () => {

        beforeEach(() => settings.interceptors.length = 0);

        it('allows to add a single interceptor', () => {
            settings.addInterceptor({
                name: 'test'
            });
            assert.equal(settings.interceptors.length, 1);
            assert(settings.interceptors[0].name === 'test');
        });

        it('allows to insert interceptor at the beginning', () => {
            settings.addInterceptor({
                name: 'second'
            }, {
                priority: 2
            });
            settings.addInterceptor({
                name: 'first'
            }, {
                priority: 1
            });
            assert.equal(settings.interceptors.length, 2);
            assert(settings.interceptors[0].name === 'first');
            assert(settings.interceptors[1].name === 'second');
        });

        it('allows to insert interceptor at the end', () => {
            settings.addInterceptor({
                name: 'first'
            }, {
                priority: 1
            });
            settings.addInterceptor({
                name: 'second'
            }, {
                priority: 2
            });
            assert.equal(settings.interceptors.length, 2);
            assert(settings.interceptors[0].name === 'first');
            assert(settings.interceptors[1].name === 'second');
        });
    });
});