'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let pattern;
let postprocessorMock = sinon.stub();

const postfix = proxyquire('../src/plugins/postfix', {
    '../core/post-processor': (loggerInstance, params) => {
        postprocessorMock.reset();
        postprocessorMock.returns(params);
        return postprocessorMock();
    },
    '../core/settings': {
        getConfig: () => pattern
    }
});

describe('Postfix plugin', () => {

    it('does not add postfix to an empty params list', () => {

        // given
        const params = [];

        // when
        const transformedParams = postfix.transform(params);

        // then
        assert.equal(transformedParams.length, 0);
        assert(postprocessorMock.calledOnce);
    });

    it('adds default postfix at the beginning when a single param present', () => {

        // given
        const params = ['test'];
        pattern = null;

        // when
        const transformedParams = postfix.transform(params);

        // then
        assert.equal(transformedParams.length, 2);
        assert.equal(transformedParams[0], 'test');
        assert.equal(transformedParams[1], '( $path )');
        assert(postprocessorMock.calledOnce);
    });

    it('adds specified postfix at the beginning when multiple params present', () => {

        // given
        const params = ['one', 'two'];
        pattern = '[ unit test ]';

        // when
        const transformedParams = postfix.transform(params);

        // then
        assert.equal(transformedParams.length, 3);
        assert.equal(transformedParams[0], 'one');
        assert.equal(transformedParams[1], 'two');
        assert.equal(transformedParams[2], '[ unit test ]');
        assert(postprocessorMock.calledOnce);
    });

});
