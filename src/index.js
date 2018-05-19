import changeCase from 'change-case';
import dotProp from 'dot-prop';
import extend from 'extend';
import readPkgUp from 'read-pkg-up';

const now = new Date();
const DEFAULTS = {
  case: 'param-case',
  data: {
    date: now.toISOString(),
    year: now.getFullYear(),
  },
  pkg: null,
  template: `/*!
 * @name v@version
 * @homepage
 *
 * Copyright @year @author.name
 * Released under the @license license
 *
 * Date: @date
 */
`,
  lite: false,
  liteTemplate: '/*! @name v@version | (c) @year @author.name | @license */',
};
const REGEXP_SCOPE = /^.+\//;
const REGEXP_PLACEHOLDER = /@(\w+(?:\.\w+)*)/gi;

export default function createBanner(options) {
  const opts = extend(true, {}, DEFAULTS, options);
  let { pkg } = opts;

  if (typeof pkg !== 'object' || pkg === null) {
    ({ pkg } = readPkgUp.sync());
  }

  const data = extend(true, {}, pkg, opts.data);
  const convertCase = changeCase[changeCase.camelCase(opts.case)];

  data.name = data.name.replace(REGEXP_SCOPE, '');

  if (typeof convertCase === 'function') {
    data.name = convertCase(data.name);
  }

  const template = opts.lite ? opts.liteTemplate : opts.template;

  return template.replace(
    REGEXP_PLACEHOLDER,
    (placeholder, property) => dotProp.get(data, property),
  );
}
