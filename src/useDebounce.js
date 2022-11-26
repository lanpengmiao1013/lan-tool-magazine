/**
 * 防抖函数，触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * https://github.com/mqyqingfeng/Blog/issues/22
 */
 const useDebounce = (fn, wait=1000, immediate) => {
  let timeout, result;
  let debounced = function () {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(this, arguments)
    }
    else {
      timeout = setTimeout(function () {
        fn.apply(this, arguments)
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}
export default useDebounce
