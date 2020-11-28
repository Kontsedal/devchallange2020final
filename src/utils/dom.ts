import { Position } from '../simulation/interfaces/position';

export interface EnhancedDomElement {
  element: HTMLElement;
  classNames: (classes: Record<string, boolean>) => void;
  css: (
    styles: Partial<Record<keyof CSSStyleDeclaration, string | number>>
  ) => EnhancedDomElement;
  onMove: (
    newPosition?: OmitThisParameter<
      (newPosition: {
        x: number;
        y: number;
        xDiff: number;
        yDiff: number;
      }) => void
    >
  ) => void;
  on: (eventName: string, handler: (...args: any[]) => unknown) => () => void;
}

export const enhanceDom = (selector: string): EnhancedDomElement => {
  const domElement = document.querySelector(selector) as HTMLElement;
  const api = Object.create(null);
  function enable(fn: (...args: any[]) => unknown) {
    return (...args: unknown[]) => {
      fn(domElement, ...args);
      return api;
    };
  }
  api.element = domElement;
  api.classNames = enable(applyClassNames);
  api.css = enable(applyStyles);
  api.onMove = enable(onMove);
  api.on = enable(attachEvent);
  return api;
};

function attachEvent(
  element: HTMLElement | Document | Window,
  eventName: string,
  handler: (...args: any[]) => void
) {
  element.addEventListener(eventName, handler);
  return () => element.removeEventListener(eventName, handler);
}

type NewPosition = Position & { xDiff: number; yDiff: number };
export const onMove = (
  target: HTMLElement | void,
  onDrag: (newPosition: NewPosition) => void
) => {
  if (!target) {
    return;
  }
  attachEvent(target, 'mousedown', (event) => {
    const initialX = event.clientX;
    const initialY = event.clientY;
    let xDiff = 0;
    let yDiff = 0;
    const offMouseMove = attachEvent(
      document,
      'mousemove',
      (moveEvent: MouseEvent) => {
        xDiff = moveEvent.clientX - initialX;
        yDiff = moveEvent.clientY - initialY;
        if (typeof onDrag === 'function') {
          onDrag({ x: initialX + xDiff, y: initialY + yDiff, xDiff, yDiff });
        }
      }
    );
    const offMouseUp = attachEvent(document, 'mouseup', function handleUp() {
      offMouseMove();
      offMouseUp();
    });
  });
};

function applyClassNames(
  element: HTMLElement,
  classes: Record<string, boolean>
) {
  Object.entries(classes).forEach(([className, enabled]) => {
    if (!enabled) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  });
}

function applyStyles(
  element: HTMLElement | void,
  styles: Partial<Record<keyof CSSStyleDeclaration, string | number>>
) {
  if (!element) {
    return;
  }

  Object.entries(styles).forEach(([key, value]) => {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    element.style[key] = typeof value === 'number' ? `${value}px` : value;
  });
}
