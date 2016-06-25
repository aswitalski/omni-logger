'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let pattern;
let postprocessorMock = sinon.stub();

const prefix = proxyquire('../src/plugins/prefix', {
    '../core/post-processor': (loggerInstance, params) => {
        postprocessorMock.reset();
        postprocessorMock.returns(params);
        return postprocessorMock();
    },
    '../core/settings': {
        getConfig: () => pattern
    }
});

describe('Prefix plugin', () => {

    it('does not add prefix to an empty params list', () => {

        // given
        const params = [];

        // when
        const transformedParams = prefix.transform(params);

        // then
        assert.equal(transformedParams.length, 0);
        assert(postprocessorMock.calledOnce);
    });

    it('adds default prefix at the beginning when a single param present', () => {

        // given
        const params = ['test'];
        pattern = null;

        // when
        const transformedParams = prefix.transform(params);

        // then
        assert.equal(transformedParams.length, 2);
        assert.equal(transformedParams[0], '[ $module ]');
        assert.equal(transformedParams[1], 'test');
        assert(postprocessorMock.calledOnce);
    });

    it('adds specified prefix at the beginning when multiple params present', () => {

        // given
        const params = ['one', 'two'];
        pattern = '[ unit test ]';

        // when
        const transformedParams = prefix.transform(params);

        // then
        assert.equal(transformedParams.length, 3);
        assert.equal(transformedParams[0], '[ unit test ]');
        assert.equal(transformedParams[1], 'one');
        assert.equal(transformedParams[2], 'two');
        assert(postprocessorMock.calledOnce);
    });

});
