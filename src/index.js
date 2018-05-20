import changeCase from 'change-case';
import dotProp from 'dot-prop';
import extend from 'extend';
import readPkgUp from 'read-pkg-up';

const now = new Date();
const TEMPLATES = {
  normal: `/*!
 * @name v@version
 * @homepage
 *
 * Copyright @year @author.name
 * Released under the @license license
 *
 * Date: @date
 */
`,
  simple: `/*!
 * @name v@version
 * Copyright @year @author.name
 * Released under the @license license
 */
`,
  inline: '/*! @name v@version | (c) @year @author.name | @license */',
};
const DEFAULTS = {
  case: '',
  data: {
    date: now.toISOString(),
    year: now.getFullYear(),
  },
  pkg: null,
  template: 'normal',
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

  const template = TEMPLATES[opts.template] || String(opts.template);

  return template.replace(
    REGEXP_PLACEHOLDER,
    (placeholder, property) => dotProp.get(data, property),
  );
}
