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
