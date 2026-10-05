/**
 * Page-scroll lock for dialogs. Uses a class on <html> so the lock does
 * not write an inline style (those need style-src 'unsafe-inline').
 * A counter lets the mobile menu and the contact dialog overlap safely.
 */
let depth = 0;

export function lockPageScroll(): () => void {
  depth += 1;
  document.documentElement.classList.add("scroll-lock");
  return () => {
    depth = Math.max(0, depth - 1);
    if (depth === 0) document.documentElement.classList.remove("scroll-lock");
  };
}
