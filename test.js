const assert = require('assert');
const createBanner = require('./');

describe('create-banner', () => {
  describe('options', () => {
    describe('case', () => {
      it('should be `param-case` be default', () => {
        assert(createBanner().indexOf('create-banner') >= 0);
      });

      it('should be `camelCase`', () => {
        assert(createBanner({
          case: 'camelCase',
        }).indexOf('createBanner') >= 0);
      });

      it('should be `PascalCase`', () => {
        assert(createBanner({
          case: 'PascalCase',
        }).indexOf('CreateBanner') >= 0);
      });
    });

    describe('data', () => {
      it('should support custom date', () => {
        const date = new Date().toLocaleString();

        assert(createBanner({
          data: {
            date,
          },
        }).indexOf(date) >= 0);
      });

      it('should support custom year', () => {
        const year = `${new Date().getFullYear()}-present`;

        assert(createBanner({
          data: {
            year,
          },
        }).indexOf(year) >= 0);
      });

      it('should support custom property', () => {
        const foo = 'https://github.com/fengyuanchen/create-banner/blob/master/LICENSE';

        assert.equal(createBanner({
          data: {
            foo,
          },

          template: '/*! @foo */',
        }), `/*! ${foo} */`);
      });

      it('should support to override existing property in package.json', () => {
        const license = 'https://github.com/fengyuanchen/create-banner/blob/master/LICENSE';

        assert.equal(createBanner({
          data: {
            license,
          },

          template: '/*! @license */',
        }), `/*! ${license} */`);
      });
    });

    describe('lite', () => {
      it('should be `false` by default', () => {
        assert(createBanner().indexOf('Date') >= 0);
      });

      it('should create a lite banner', () => {
        assert(createBanner({
          lite: true,
        }).indexOf('Date') < 0);
      });
    });

    describe('pkg', () => {
      it('should be `null` and use the data of current package by default', () => {
        assert(createBanner().indexOf('create-banner') >= 0);
      });

      it('should use the given package data', () => {
        assert(createBanner({
          pkg: {
            name: 'foo',
          },
        }).indexOf('foo') >= 0);
      });
    });

    describe('template', () => {
      it('should create a banner base on the given template', () => {
        const template = '/*! foo */';

        assert.equal(createBanner({
          template,
        }), template);
      });
    });

    describe('liteTemplate', () => {
      it('should create a lite banner base on the given template', () => {
        const liteTemplate = '/*! foo */';

        assert.equal(createBanner({
          liteTemplate,
          lite: true,
        }), liteTemplate);
      });
    });
  });
});
