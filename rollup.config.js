const babel = require('rollup-plugin-babel');
const createBanner = require('./');

const banner = createBanner({
  case: 'camelCase',
  data: {
    year: '2018-present',
  },
});

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/create-banner.common.js',
      format: 'cjs',
    },
    {
      banner,
      file: 'dist/create-banner.esm.js',
      format: 'esm',
    },
  ],
  external: [
    'change-case',
    'dot-prop',
    'extend',
    'read-pkg-up',
  ],
  plugins: [
    babel(),
  ],
};
