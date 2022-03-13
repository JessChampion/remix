import { find, head, isNil, propEq } from "ramda";

// eslint-disable-next-line  import/prefer-default-export
export const getImageFromSet = (
  images: Array<IImageObject>,
  targetSize: number = 300
): IImageObject => {
  const foundImage = find<IImageObject>(propEq("width", targetSize), images);
  return (!isNil(foundImage) ? foundImage : head(images)) as IImageObject;
};

export const KEYS = {
  space: 32,
  enter: 13,
  escape: 27,
};

export const KEY_CONFIG = {
  selectKeyCodes: [KEYS.space, KEYS.enter], // space and enter
  exitKeyCodes: [KEYS.escape],
};

// handleKeyboardEvent
// --------------------------------------
// Create a keyboard event handler that calls the given function
// if the event key code is one of the supplied keys
const getKeyCode = (event: React.KeyboardEvent | KeyboardEvent) =>
  event.which || event.keyCode;

/**
 js *
 * @param action {function} event handler callback
 * @param targetKeys {Array<number>} keycodes to apply handler to
 * @returns {function} event handler function
 */
export const handleKeyboardEvent =
  (action: Function, targetKeys: Array<number> = KEY_CONFIG.selectKeyCodes) =>
  (event: React.KeyboardEvent | KeyboardEvent) => {
    if (targetKeys.includes(getKeyCode(event))) {
      action(event);
    }
  };
