/**
 * @jest-environment jsdom
 */
import shimKeyboardEvent from '../shimKeyboardEvent';

test('fixes key propertey in KeyboardEvent set by older browsers', () => {
  const event = new KeyboardEvent('keydown', { key: 'Esc' });

  shimKeyboardEvent(event);

  expect(event.key).toBe('Escape');
});

test('does not modify KeyboardEvent in modern browsers', () => {
  const event = new KeyboardEvent('keydown', { key: 'Escape' });

  Object.freeze(event);

  expect(() => shimKeyboardEvent(event)).not.toThrow();
});
