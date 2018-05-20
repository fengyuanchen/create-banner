# create-banner

[![Build Status](https://img.shields.io/travis/fengyuanchen/create-banner.svg)](https://travis-ci.org/fengyuanchen/create-banner) [![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/create-banner.svg)](https://codecov.io/gh/fengyuanchen/create-banner) [![Downloads](https://img.shields.io/npm/dm/create-banner.svg)](https://www.npmjs.com/package/create-banner) [![Version](https://img.shields.io/npm/v/create-banner.svg)](https://www.npmjs.com/package/create-banner)

> Create a banner from a package.json file.

## Main

```text
dist/
├── create-banner.common.js (CommonJS, default)
└── create-banner.esm.js    (ES Module)
```

## Install

```shell
npm install create-banner
```

## Usage

### Syntax

```js
createBanner(options);
```

- **options**
  - Type: `Object`
  - The [options](#options) for creating banner.

- (return value)
  - Type: `String`
  - Return the created banner.

### Examples

```js
import createBanner from 'create-banner';

createBanner();
/*!
 * create-banner v1.0.0
 * https://github.com/fengyuanchen/create-banner
 *
 * Copyright 2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-05-19T09:18:34.739Z
 */

createBanner({ case: 'camelCase', template: 'simple' });
/*!
 * createBanner v1.0.0
 * Copyright 2018 Chen Fengyuan
 * Released under the MIT license
 */

createBanner({ case: 'Title Case', template: 'inline' });
/*! Create Banner v1.0.0 | (c) 2018 Chen Fengyuan | MIT */
```

## Options

### case

- Type: `String`
- Default: `''`
- Options:
  - `'param-case'`
  - `'camelCase'`
  - `'PascalCase'`
  - `'Title Case'`
  - And other cases supported by the [change-case](https://www.npmjs.com/package/change-case) package.

The case of the package name in the banner. Not to change the package name case by default.

### data

- Type: `Object`
- Default:

  ```js
  {
    date: new Date().toISOString(),
    year: new Date().getFullYear(),
  }
  ```

The extra data for creating banner, will be merged into package data.

```js
createBanner({
  data: {
    name: 'Library.js',
    year: '2018-present',
  },
});
```

### pkg

- Type: `Object`
- Default: `null`

The package data for creating banner. If it is null, will read from the closest `package.json` file by default using the [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) package.

### template

- Type: `String`
- Default: `'normal'`
- Options:
  - `'normal'`:
    ```js
    /*!
     * @name v@version
     * @homepage
     *
     * Copyright @year @author.name
     * Released under the @license license
     *
     * Date: @date
     */
    ```
  - `'simple'`:
    ```js
    /*!
     * @name v@version
     * Copyright @year @author.name
     * Released under the @license license
     */
    ```
  - `'inline'`:
    ```js
    /*! @name v@version | (c) @year @author.name | @license */
    ```
  - Other values will be used directly as a custom template.

The template for creating banner. Property using a dot path is supported by the [dot-prop](https://www.npmjs.com/package/dot-prop) package.

Example for custom template:

```js
createBanner({
  template: `/*!
 * @name v@version
 * @license (c) @author.name
 */
`,
});
/*!
 * create-banner v1.0.0
 * MIT (c) Chen Fengyuan
 */
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Chen Fengyuan](http://chenfengyuan.com)
