export const ScrollUp = () => {
  if (!window.scrollY) return;
  window.scrollTo(0, 0);
};
