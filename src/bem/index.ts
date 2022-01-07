/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

export type Mod = string | { [key: string]: any };
export type Mods = Mod | Mod[];

function gen(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + gen(name, item), '');
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? gen(name, key) : ''),
    ''
  );
}

/**
 * 创建一个函数，生成以 block 开始的字符串集合
 * @param block 字符串
 * @returns {Function}
 */
export function createBEM(block: string) {
  return function (el?: Mods, mods?: Mods): Mods {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? `${block}__${el}` : block;

    return `${el}${gen(el, mods)}`;
  };
}

export type BEM = ReturnType<typeof createBEM>;
