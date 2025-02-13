//throttle.js
/**
 * 节流函数
 * @param {*} func 要执行的函数
 * @param {*} wait 时间间隔
 * @returns
 */
export function throttle(
  func: { apply: (arg0: any, arg1: any[]) => void },
  wait: number
) {
  let previous = 0;
  return function (a: any) {
    let context = this,
      args: any[] = [a];
    let now = +new Date();
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

/**
 * 防抖函数
 * @param func 需要进行防抖处理的函数
 * @param delay 防抖的延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 延时函数
 * @param ms 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
