import castArray from '../castArray';

test('returns non-array items wrapped in an array', () => {
  expect(castArray(undefined)).toEqual([undefined]);
  expect(castArray(null)).toEqual([null]);
  expect(castArray(true)).toEqual([true]);
  expect(castArray(1337)).toEqual([1337]);
  expect(castArray('hello world')).toEqual(['hello world']);

  const object = { hello: 'world' };
  expect(castArray(object)).toEqual([object]);
  expect(castArray(object)).toContain(object);
});

test('return array by reference', () => {
  var array = ['hello world'];
  expect(castArray(array)).toBe(array);
});
