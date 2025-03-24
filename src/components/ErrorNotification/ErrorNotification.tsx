import { useEffect } from 'react';

type Props = {
  error: string;
  setError: (value: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    const timeError = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timeError);
    };
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
