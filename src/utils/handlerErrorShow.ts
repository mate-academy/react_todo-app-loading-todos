export const handlerErrorShow = (
  error: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): void => {
  setErrorMessage(error);
  setTimeout(() => {
    setErrorMessage('');
  }, 3000);
};
