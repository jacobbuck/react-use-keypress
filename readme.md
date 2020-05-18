# react-use-keydown

React hook which listens for pressed keys.

## Usage

```jsx
useKeydown(keys, handler);
```

### Parameters

- `keys`
- `handler`

### Example

```jsx
import useKeydown from 'react-use-keydown';

const Example = props => {
  useKeydown('Escape', () => {
    // Do something when the user has press the Escape key
  });
  ...
};
```

## Requirements

Requires a minimum of React version 16.8.0 for the Hooks API.
