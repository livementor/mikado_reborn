const FOCUSABLE_ELEMENT_SELECTORS = [
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  'button',
  'iframe',
  'object',
  '[tabindex="0"]',
  '[contenteditable]',
];

const TAB_KEY = 'Tab';

interface FocusLoopConfig {
  el: HTMLElement;
  focusElement: HTMLElement | null;
}

const focusTrap = (config: FocusLoopConfig): (() => void) | null => {
  if (!config) {
    throw new Error('Could not initialize focus-trapping - Config Missing');
  }
  const { el, focusElement } = config;

  if (!el) {
    throw new Error('Could not initialize focus-trapping - Element Missing');
  }

  const focusableElements = el.querySelectorAll<
    | HTMLLinkElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLIFrameElement
    | HTMLObjectElement
    | HTMLButtonElement
  >(FOCUSABLE_ELEMENT_SELECTORS.join(','));

  if (!focusableElements.length) return null;

  const firstFocusableEl = focusableElements[0];
  const lastFocusableEl = focusableElements[focusableElements.length - 1];
  const elementToFocus = focusElement ?? firstFocusableEl;
  elementToFocus.focus();

  const keyboardHandler = (e: KeyboardEvent) => {
    if (e.key !== TAB_KEY) return;

    if (e.shiftKey && document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };
  el.addEventListener<'keydown'>('keydown', keyboardHandler);

  return function cleanUp() {
    if (!keyboardHandler) return;
    el.removeEventListener('keydown', keyboardHandler);
  };
};

export default focusTrap;
