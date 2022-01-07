import { createBEM } from '../src/bem';

test('测试 bem 功能', () => {
  const bem = createBEM('button');

  expect(bem()).toBe('button');

  expect(bem('text')).toBe('button__text');

  expect(bem('text', { disabled: true })).toBe(
    'button__text button__text--disabled'
  );

  expect(bem('text', { disabled: false })).toBe('button__text');

  expect(bem(['disabled', 'primary'])).toBe(
    'button button--disabled button--primary'
  );
});
