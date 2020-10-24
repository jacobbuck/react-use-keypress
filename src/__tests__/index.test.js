import { act, renderHook } from '@testing-library/react-hooks';
import useKeypress from '..';

test('calls handler when matching key has been pressed', () => {
  const handler = jest.fn();
  renderHook(() => useKeypress('Escape', handler));

  const event = new KeyboardEvent('keydown', { key: 'Escape' });

  act(() => {
    window.dispatchEvent(event);
  });

  expect(handler).toHaveBeenCalledWith(event);
});

test('calls handler when matching keys has been pressed', () => {
  const handler = jest.fn();
  renderHook(() => useKeypress(['Enter', ' '], handler));

  const event1 = new KeyboardEvent('keydown', { key: 'Enter' });
  const event2 = new KeyboardEvent('keydown', { key: ' ' });

  act(() => {
    window.dispatchEvent(event1);
  });

  act(() => {
    window.dispatchEvent(event2);
  });

  expect(handler).toHaveBeenNthCalledWith(1, event1);
  expect(handler).toHaveBeenNthCalledWith(2, event2);
});

test('does not call handler when non-matching key has been pressed', () => {
  const handler = jest.fn();
  renderHook(() => useKeypress('Escape', handler));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(handler).not.toHaveBeenCalled();
});

test('supports older browsers', () => {
  const handler = jest.fn();
  renderHook(() => useKeypress('Escape', handler));

  const event = new KeyboardEvent('keydown', { key: 'Esc' });

  act(() => {
    window.dispatchEvent(event);
  });

  expect(handler).toHaveBeenCalledWith(event);
});

test('throws if keys is not an array or string', () => {
  const { result } = renderHook(() => useKeypress({}, jest.fn()));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(result.error).toEqual(
    new TypeError(
      'Expected `keys` to be of type `array` or `string`, but received type `object`'
    )
  );
});

test('throws if keys contains a value that is not a string', () => {
  const { result } = renderHook(() => useKeypress(['Escape', {}], jest.fn()));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(result.error).toEqual(
    new TypeError(
      'Expected `keys[1]` to be of type `string`, but received type `object`'
    )
  );
});

test('throws if handler is not a function', () => {
  const { result } = renderHook(() => useKeypress('Enter', {}));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(result.error).toEqual(
    new TypeError(
      'Expected `handler` to be of type `function`, but received type `object`'
    )
  );
});

test('doesn’t throw if handler is nullish', () => {
  const { result: result1 } = renderHook(() => useKeypress('Enter', null));
  const { result: result2 } = renderHook(() => useKeypress('Enter', undefined));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(result1.error).toBeUndefined();
  expect(result2.error).toBeUndefined();
});

test('doesn’t typecheck in production', () => {
  const env = process.env;
  process.env = { NODE_ENV: 'production' };

  const { result } = renderHook(() => useKeypress({}, jest.fn()));

  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });

  expect(result.error).not.toEqual(
    new TypeError(
      'Expected `keys` to be of type `array` or `string`, but received type `object`'
    )
  );

  process.env = env;
});
