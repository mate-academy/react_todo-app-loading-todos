export const handleErrorWithTimeout = (
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): (() => void) => {
  setErrorMessage(errorMessage);

  const timeout = setTimeout(() => {
    setErrorMessage('');
  }, 3000);

  return () => {
    clearTimeout(timeout);
  };
};
