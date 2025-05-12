import { useEffect } from 'react';

type Props = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorMsg: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    if (error === '') {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const closeErrorMsg = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError('');
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={
        `notification is-danger is-light has-text-weight-normal` +
        (error ? '' : ' hidden')
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={closeErrorMsg}
      />
      {error}
    </div>
  );
};
