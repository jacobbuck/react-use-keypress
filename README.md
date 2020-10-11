# react-use-keypress

React hook which listens for pressed keys.

## Usage

```jsx
useKeypress(keys, handler);
```

### Parameters

- `keys` a single or array of [key value(s)](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) to listen to.
- `handler` function to be called when one of the matching key values has been pressed.

### Example

Listening to a single key:

```jsx
import useKeypress from 'react-use-keypress';

const Example = (props) => {
  // ...
  useKeypress('Escape', () => {
    // Do something when the user has pressed the Escape key
  });
  // ...
};
```

Listening to multiple keys:

```jsx
import useKeypress from 'react-use-keypress';

const Example = (props) => {
  // ...
  useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
    if (event.key === 'ArrowLeft') {
      moveLeft();
    } else {
      moveRight();
    }
  });
  // ...
};
```

## Browser Support

Includes a shim for the `KeyboardEvent.key` property to handle inconsistencies from Internet Explorer and older versions of Edge and Firefox.

## Requirements

Requires a minimum of React version 16.8.0 for the Hooks API.
