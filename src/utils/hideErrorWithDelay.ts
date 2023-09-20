type TCallback = (newValue: boolean) => void;

export function waitToClose(delay: number, callback: TCallback) {
  window.setTimeout(() => {
    callback(false);
  }, delay);
}
