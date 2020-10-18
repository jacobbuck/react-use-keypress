import { useEffect } from 'react';
import useLatest from 'use-latest';
import shimKeyboardEvent from './shimKeyboardEvent';

const useKeypress = (keys, handler) => {
  if (process.env.NODE_ENV !== 'production') {
    if (Array.isArray(keys)) {
      keys.forEach((key, i) => {
        if (typeof key !== 'string') {
          throw new TypeError(
            `Expected \`keys[${i}]\` to be of type \`string\`, but received type \`${typeof key}\``
          );
        }
      });
    } else if (typeof keys !== 'string') {
      throw new TypeError(
        `Expected \`keys\` to be of type \`array\` or \`string\`, but received type \`${typeof handler}\``
      );
    }
    if (typeof handler !== 'function' && handler != null) {
      throw new TypeError(
        `Expected \`handler\` to be of type \`function\`, but received type \`${typeof handler}\``
      );
    }
  }

  const keysRef = useLatest(keys);
  const handerRef = useLatest(handler);

  useEffect(() => {
    const handleKeydown = (event) => {
      shimKeyboardEvent(event);

      if (
        (Array.isArray(keysRef.current)
          ? keysRef.current.includes(event.key)
          : keysRef.current === event.key) &&
        handerRef.current != null
      ) {
        handerRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useKeypress;
