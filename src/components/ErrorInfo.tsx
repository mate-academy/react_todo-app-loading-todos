import { useEffect } from 'react';

type Props = {
  errorMessage: string;
  setError: (title: string) => void;
};

export const ErrorInfo: React.FC<Props> = ({ errorMessage, setError }) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setError(''), 3000);
    }
  }, [errorMessage, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal${errorMessage ? '' : ' hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {errorMessage}
    </div>
  );
};

// Unable to load todos
//       <br />
//       Title should not be empty
//       <br />
//       Unable to add a todo
//       <br />
//       Unable to delete a todo
//       <br />
//       Unable to update a todo
