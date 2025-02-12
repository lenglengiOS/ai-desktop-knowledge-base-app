/**
 * 时间戳版节流函数
 * @param func 要节流的函数
 * @param delay 节流的时间间隔（毫秒）
 * @returns 节流后的函数
 */
export function throttleTimestamp<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let previous = 0;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - previous > delay) {
      func.apply(this, args);
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
