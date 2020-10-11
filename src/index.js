import { useEffect } from 'react';
import useLatest from 'use-latest';
import shimKeyboardEvent from './shimKeyboardEvent';

const useKeypress = (keys, handler = () => {}) => {
  const keysRef = useLatest(keys);
  const handerRef = useLatest(handler);

  useEffect(() => {
    const handleKeydown = (event) => {
      shimKeyboardEvent(event);

      if (
        Array.isArray(keysRef.current)
          ? keysRef.current.includes(event.key)
          : keysRef.current === event.key
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
