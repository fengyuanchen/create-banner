const assert = require('assert');
const createBanner = require('./');

describe('create-banner', () => {
  describe('options', () => {
    describe('case', () => {
      it('should not change the name case be default', () => {
        assert(createBanner({
          data: {
            name: 'Library.js',
          },
        }).indexOf('Library.js') >= 0);
      });

      it('should be "param-case"', () => {
        assert(createBanner({
          case: 'param-case',
          data: {
            name: 'Library.js',
          },
        }).indexOf('library-js') >= 0);
      });

      it('should be "camelCase"', () => {
        assert(createBanner({
          case: 'camelCase',
          data: {
            name: 'Library.js',
          },
        }).indexOf('libraryJs') >= 0);
      });

      it('should be "PascalCase"', () => {
        assert(createBanner({
          case: 'PascalCase',
          data: {
            name: 'Library.js',
          },
        }).indexOf('LibraryJs') >= 0);
      });

      it('should be "Title Case"', () => {
        assert(createBanner({
          case: 'Title Case',
          data: {
            name: 'Library.js',
          },
        }).indexOf('Library Js') >= 0);
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
      it('should be "normal" by default', () => {
        assert(createBanner().indexOf('Date') >= 0);
      });

      it('should be "simple"', () => {
        assert(createBanner({
          template: 'simple',
        }).indexOf('Date') < 0);
      });

      it('should be "inline"', () => {
        assert(createBanner({
          template: 'inline',
        }).indexOf('(c)') >= 0);
      });

      it('should create a banner bases on the given template', () => {
        const template = '/*! foo */';

        assert.equal(createBanner({
          template,
        }), template);
      });
    });
  });
});
