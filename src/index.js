import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import shimKeyboardEvent from './shimKeyboardEvent';

const useKeypress = (keys, handler) => {
  invariant(
    Array.isArray(keys) || typeof keys === 'string',
    'Expected `keys` to be an array or string'
  );
  if (Array.isArray(keys)) {
    keys.forEach((key, i) => {
      invariant(
        typeof key === 'string',
        `Expected \`keys[${i}]\` to be a string`
      );
    });
  }
  invariant(
    typeof handler === 'function' || handler == null,
    'Expected `handler` to be a function'
  );

  const eventListenerRef = useRef();

  useEffect(() => {
    eventListenerRef.current = (event) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event) => {
      eventListenerRef.current(event);
    };
    window.addEventListener('keydown', eventListener);
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, []);
};

export default useKeypress;
