export const debounce = (fn, time) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      return fn(...args);
    }, time);
  };
};
