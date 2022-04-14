/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react-hooks';
import useKeypress from '..';

const createKeydownEvent = (key) => new KeyboardEvent('keydown', { key });

const dispatchWindowEvent = (event) =>
  act(() => {
    window.dispatchEvent(event);
  });

const renderUseKeypressHook = (...args) =>
  renderHook(() => useKeypress(...args));

test('calls handler when matching key has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  const event = createKeydownEvent('Escape');

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});

test('calls handler when matching keys has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook(['Enter', ' '], handler);

  const event1 = createKeydownEvent('Enter');
  const event2 = createKeydownEvent(' ');

  dispatchWindowEvent(event1);
  dispatchWindowEvent(event2);

  expect(handler).toHaveBeenNthCalledWith(1, event1);
  expect(handler).toHaveBeenNthCalledWith(2, event2);
});

test('does not call handler when non-matching key has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(handler).not.toHaveBeenCalled();
});

test('supports older browsers', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  const event = createKeydownEvent('Esc');

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});

test('throws if keys is not an array or string', () => {
  const { result } = renderUseKeypressHook({}, jest.fn());

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(result.error).toEqual(
    new Error('Invariant failed: Expected `keys` to be an array or string')
  );
});

test('throws if keys contains a value that is not a string', () => {
  const { result } = renderUseKeypressHook(['Escape', {}], jest.fn());

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(result.error).toEqual(
    new Error('Invariant failed: Expected `keys[1]` to be a string')
  );
});

test('throws if handler is not a function', () => {
  const { result } = renderUseKeypressHook('Enter', {});

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(result.error).toEqual(
    new Error('Invariant failed: Expected `handler` to be a function')
  );
});

test('doesn’t throw if handler is nullish', () => {
  const { result: result1 } = renderUseKeypressHook('Enter', null);
  const { result: result2 } = renderUseKeypressHook('Enter', undefined);

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(result1.error).toBeUndefined();
  expect(result2.error).toBeUndefined();
});
