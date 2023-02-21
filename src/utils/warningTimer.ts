export const warningTimer = (
  callback: (value: boolean) => void,
  value: boolean,
  delay: number,
) => {
  let timerId;

  clearInterval(timerId);
  timerId = setTimeout(() => {
    callback(value);
  }, delay);
};
