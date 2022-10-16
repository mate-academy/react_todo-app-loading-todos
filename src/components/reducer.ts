export const reducer = (count: number, action: string) => {
  switch (action) {
    case 'increase':
      return count + 1;
    case 'decrease':
      return count - 1;
    case 'clear':
      return 0;
    default:
      return count;
  }
};
