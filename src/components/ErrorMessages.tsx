import { ErrorMessagesNotification } from '../api/todos';
import { useEffect } from 'react';

type ErrorMessagesProps = {
  error: ErrorMessagesNotification | null;
  setError: (error: ErrorMessagesNotification | null) => void;
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ error, setError }) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};

export default ErrorMessages;
