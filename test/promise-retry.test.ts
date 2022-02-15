import { retry } from '../src/promise-retry';

function promiseFunc(type: 'success' | 'error') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      type === 'success' ? resolve(true) : reject(new Error('超时'));
    }, 100);
  });
}

function allSuccess() {
  return promiseFunc('success');
}
let times = 0;

function onceError() {
  return promiseFunc(times++ >= 1 ? 'success' : 'error');
}

function allError() {
  return promiseFunc('error');
}

test('测试 promise-retry 功能 allError', () => {
  return retry(allError)().catch(err => expect(err).toBeInstanceOf(Error));
});

test('测试 promise-retry 功能 allSuccess', () => {
  return retry(allSuccess)().then(res => expect(res).toBe(true));
});

test('测试 promise-retry 功能 onceError', () => {
  return retry(onceError)().then(res => expect(res).toBe(true));
});
