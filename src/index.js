import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import useLatest from 'use-latest';
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

  const keysRef = useLatest(keys);
  const handerRef = useLatest(handler);

  useEffect(() => {
    const handleKeydown = (event) => {
      shimKeyboardEvent(event);

      if (
        (Array.isArray(keysRef.current) &&
          keysRef.current.includes(event.key)) ||
        keysRef.current === event.key
      ) {
        handerRef.current?.(event);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useKeypress;
