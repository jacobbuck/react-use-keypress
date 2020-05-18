import { useEffect, useRef } from 'react';
import castArray from './castArray';
import shimKeyboardEvent from './shimKeyboardEvent';

const useKeypress = (keys, handler) => {
  const keysRef = useRef(keys);
  const handerRef = useRef(handler);

  useEffect(() => {
    keysRef.current = keys;
    handerRef.current = handler;
  }, [keys, handler]);

  useEffect(() => {
    const handleKeydown = (event) => {
      shimKeyboardEvent(event);

      if (castArray(keysRef.current).includes(event.key)) {
        handerRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
};

export default useKeypress;
