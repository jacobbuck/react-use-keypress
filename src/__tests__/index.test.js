/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
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
  expect(() => useKeypress({}, jest.fn())).toThrow(
    new Error('Invariant failed: Expected `keys` to be an array or string')
  );
});

test('throws if keys contains a value that is not a string', () => {
  expect(() => useKeypress(['Escape', {}], jest.fn())).toThrow(
    new Error('Invariant failed: Expected `keys[1]` to be a string')
  );
});

test('throws if handler is not a function', () => {
  expect(() => useKeypress('Enter', {})).toThrow(
    new Error('Invariant failed: Expected `handler` to be a function')
  );
});

test('doesn’t throw if handler is nullish', () => {
  expect(() => {
    renderUseKeypressHook('Enter', null);
    renderUseKeypressHook('Enter', undefined);
    dispatchWindowEvent(createKeydownEvent('Enter'));
  }).not.toThrow();
});
