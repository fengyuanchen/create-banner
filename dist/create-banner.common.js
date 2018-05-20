/*!
 * createBanner v1.0.0
 * https://github.com/fengyuanchen/create-banner
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-05-20T06:11:34.311Z
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var changeCase = _interopDefault(require('change-case'));
var dotProp = _interopDefault(require('dot-prop'));
var extend = _interopDefault(require('extend'));
var readPkgUp = _interopDefault(require('read-pkg-up'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var now = new Date();
var TEMPLATES = {
  normal: '/*!\n * @name v@version\n * @homepage\n *\n * Copyright @year @author.name\n * Released under the @license license\n *\n * Date: @date\n */\n',
  simple: '/*!\n * @name v@version\n * Copyright @year @author.name\n * Released under the @license license\n */\n',
  inline: '/*! @name v@version | (c) @year @author.name | @license */'
};
var DEFAULTS = {
  case: '',
  data: {
    date: now.toISOString(),
    year: now.getFullYear()
  },
  pkg: null,
  template: 'normal'
};
var REGEXP_SCOPE = /^.+\//;
var REGEXP_PLACEHOLDER = /@(\w+(?:\.\w+)*)/gi;

function createBanner(options) {
  var opts = extend(true, {}, DEFAULTS, options);
  var pkg = opts.pkg;


  if ((typeof pkg === 'undefined' ? 'undefined' : _typeof(pkg)) !== 'object' || pkg === null) {
    var _readPkgUp$sync = readPkgUp.sync();

    pkg = _readPkgUp$sync.pkg;
  }

  var data = extend(true, {}, pkg, opts.data);
  var convertCase = changeCase[changeCase.camelCase(opts.case)];

  data.name = data.name.replace(REGEXP_SCOPE, '');

  if (typeof convertCase === 'function') {
    data.name = convertCase(data.name);
  }

  var template = TEMPLATES[opts.template] || String(opts.template);

  return template.replace(REGEXP_PLACEHOLDER, function (placeholder, property) {
    return dotProp.get(data, property);
  });
}

module.exports = createBanner;
