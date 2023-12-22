import { useEffect } from 'react';
import { useTodos } from '../context/TodosProvider';

export const Error: React.FC = () => {
  const { errorMessage, setErrorMessage } = useTodos();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage, setErrorMessage]);

  return (
    // {/* Notification is shown in case of any error */}
    // {/* Add the 'hidden' class to hide the message smoothly */}
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        aria-label="hide error button"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(null)}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
