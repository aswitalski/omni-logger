'use strict';

const assert = require('assert');
const settings = require('../src/core/settings');

describe('Settings', () => {

    describe('Logger prototype', () => {

        beforeEach(() => settings.reset());

        it('allows to add an extension', () => {

            assert.equal(settings.prototype.foo, undefined);

            const extension = () => {};
            settings.addToPrototype('foo', extension);

            assert.equal(settings.prototype.foo, extension);
        });

        it('disallows to add an extension more than once', () => {

            assert.equal(settings.prototype.foo, undefined);

            const extension = () => {};
            settings.addToPrototype('foo', extension);

            assert.equal(settings.prototype.foo, extension);

            assert.throws(settings.addToPrototype.bind(settings, 'foo', extension));
        });
    });

    describe('Add interceptor', () => {

        beforeEach(() => settings.interceptors.length = 0);

        it('adds an interceptor only once', () => {
            settings.addInterceptor({
                name: 'test',
                priority: 2
            });
            settings.addInterceptor({
                name: 'test',
                priority: 1
            });
            assert.equal(settings.interceptors.length, 1);
            assert(settings.interceptors[0].name === 'test');
            assert(settings.interceptors[0].priority === 1);
        });

        it('inserts interceptor at the beginning', () => {
            settings.addInterceptor({
                name: 'second',
                priority: 2
            });
            settings.addInterceptor({
                name: 'first',
                priority: 1
            });
            assert.equal(settings.interceptors.length, 2);
            assert(settings.interceptors[0].name === 'first');
            assert(settings.interceptors[1].name === 'second');
        });

        it('inserts interceptor at the end', () => {
            settings.addInterceptor({
                name: 'first',
                priority: 1
            });
            settings.addInterceptor({
                name: 'second',
                priority: 2
            });
            assert.equal(settings.interceptors.length, 2);
            assert(settings.interceptors[0].name === 'first');
            assert(settings.interceptors[1].name === 'second');
        });
    });
});