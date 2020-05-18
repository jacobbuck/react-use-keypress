// Fixing inconsistencies from older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const aliases = new Map([
  ['Win', 'Meta'],
  ['Scroll', 'ScrollLock'],
  ['Spacebar', ' '],
  ['Down', 'ArrowDown'],
  ['Left', 'ArrowLeft'],
  ['Right', 'ArrowRight'],
  ['Up', 'ArrowUp'],
  ['Del', 'Delete'],
  ['Crsel', 'CrSel'],
  ['Exsel', 'ExSel'],
  ['Apps', 'ContextMenu'],
  ['Esc', 'Escape'],
  ['Decimal', '.'],
  ['Multiply', '*'],
  ['Add', '+'],
  ['Subtract', '-'],
  ['Divide', '/'],
]);

const shimKeyboardEvent = (event) => {
  if (aliases.has(event.key)) {
    Object.defineProperty(event, 'key', {
      value: aliases.get(event.key),
    });
  }
};

export default shimKeyboardEvent;
