export const handleErrorWithTimeout = (
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  setErrorMessage(errorMessage);
  setTimeout(() => {
    setErrorMessage('');
  }, 3000);
};
