import changeCase from 'change-case';
import dotProp from 'dot-prop';
import deepMerge from 'deepmerge';
import readPkgUp from 'read-pkg-up';

interface CreateBannerOptions {
  case?: 'camel-case' | 'capital-case' | 'constant-case' | 'dot-case' | 'header-case' | 'no-case' | 'param-case' | 'pascal-case' | 'path-case' | 'sentence-case' | 'snake-case' | '';
  data?: {
    [key: string]: any;
    date?: string;
    year?: string | number;
  };
  pkg?: readPkgUp.NormalizedPackageJson;
  template?: 'normal' | 'simple' | 'inline' | string;
}

const now = new Date();
const TEMPLATES: {
  [key: string]: any;
} = {
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
const DEFAULTS: CreateBannerOptions = {
  case: '',
  data: {
    date: now.toISOString(),
    year: now.getFullYear(),
  },
  template: 'normal',
};
const REGEXP_SCOPE = /^.+\//;
const REGEXP_PLACEHOLDER = /@(\w+(?:\.\w+)*)/gi;

function createBanner(options?: CreateBannerOptions): string {
  const opts: CreateBannerOptions = deepMerge(DEFAULTS, options || {});
  let { pkg } = opts;

  if (!pkg) {
    const result = readPkgUp.sync();

    if (result) {
      pkg = result.packageJson;
    }
  }

  const data = deepMerge(pkg || {}, opts.data || {});

  data.name = (data.name || '').replace(REGEXP_SCOPE, '');

  if (typeof changeCase.camelCase === 'function') {
    const convertCase = (changeCase as any)[changeCase.camelCase(opts.case || '')];

    if (typeof convertCase === 'function') {
      data.name = convertCase(data.name);
    }
  }

  const template = TEMPLATES[opts.template || ''] || String(opts.template);

  return template.replace(
    REGEXP_PLACEHOLDER,
    (placeholder: string, property: string) => dotProp.get(data, property),
  );
}

export default createBanner;
