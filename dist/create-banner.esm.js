/*!
 * createBanner v0.1.0
 * https://github.com/fengyuanchen/create-banner
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-05-19T09:57:28.560Z
 */

import changeCase from 'change-case';
import dotProp from 'dot-prop';
import extend from 'extend';
import readPkgUp from 'read-pkg-up';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var now = new Date();
var DEFAULTS = {
  case: 'param-case',
  data: {
    date: now.toISOString(),
    year: now.getFullYear()
  },
  pkg: null,
  template: '/*!\n * @name v@version\n * @homepage\n *\n * Copyright @year @author.name\n * Released under the @license license\n *\n * Date: @date\n */\n',
  lite: false,
  liteTemplate: '/*! @name v@version | (c) @year @author.name | @license */'
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

  var template = opts.lite ? opts.liteTemplate : opts.template;

  return template.replace(REGEXP_PLACEHOLDER, function (placeholder, property) {
    return dotProp.get(data, property);
  });
}

export default createBanner;
