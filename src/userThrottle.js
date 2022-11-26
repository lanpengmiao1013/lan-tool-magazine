/**
 * 节流函数：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * 节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 */
const userThrottle = (fn, wait = 1000, options) => {
  let timeout, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    fn.apply(this, arguments);
  };

  let throttled = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(this, arguments);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }
  return throttled;
}
export default userThrottle
