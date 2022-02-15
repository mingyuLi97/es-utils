import { PromiseFunction } from '../common';

/**
 * 异步函数重试
 * @param fn 必须为 promise
 * @param times 重试次数, 默认 2
 * @param delay 失败重试的间隔 单位: `ms` 默认: `100`
 * @example
 *  retry(this.get, 2, 500)('http://xxxxxx')
 */
export function retry<T extends PromiseFunction>(
  fn: T,
  times = 2,
  delay = 100
) {
  return function (...args: Parameters<T>) {
    const context = this;
    return new Promise((resolve, reject) => {
      const innerFn = () => {
        fn.apply(context, args)
          .then(resolve)
          .catch((e: Error) => {
            times-- > 0 ? setTimeout(innerFn, delay) : reject(e);
          });
      };
      innerFn();
    }) as ReturnType<T>;
  };
}
