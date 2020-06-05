export function on(element, event, handler) {
  if (document.addEventListener) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  } else {
    element.detachEvent('on' + event, handler);
  }
}