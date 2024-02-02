import { useEffect, useState } from 'react';
import { ErrorType, ErrorWords } from '../../types';

interface ErrorNotificationProps {
  errorType: ErrorType | null;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = (
  { errorType },
) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errorType) {
      const timerId = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timerId);
    }

    return () => { };
  }, [errorType]);

  const handleHideError = () => {
    setVisible(false);
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case ErrorType.LoadError:
        return ErrorWords.LoadError;
      case ErrorType.EmptyTitle:
        return ErrorWords.EmptyTitle;
      case ErrorType.AddTodoError:
        return ErrorWords.AddTodoError;
      case ErrorType.DeleteTodoError:
        return ErrorWords.DeleteTodoError;
      case ErrorType.UpdateTodoError:
        return ErrorWords.UpdateTodoError;
      default:
        return null;
    }
  };

  return (
    visible && errorType ? (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="Hide error"
          onClick={handleHideError}
        />
        {getErrorMessage()}
        <br />
      </div>
    ) : null
  );
};
