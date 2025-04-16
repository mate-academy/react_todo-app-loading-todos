import cn from 'classnames';
import { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { ErrorMessageType } from '../../types/ErrorMessageType';

export const ErrorWarning = () => {
  const { errorType, setErrorType } = useContext(TodoContext);

  const getErrorMessage = () => {
    switch (errorType) {
      case ErrorMessageType.Loading:
        return 'Unable to load todos';
      case ErrorMessageType.Add:
        return 'Unable to add a todo';
      case ErrorMessageType.Delete:
        return 'Unable to delete a todo';
      case ErrorMessageType.Update:
        return 'Unable to update a todo';
      case ErrorMessageType.Title:
        return 'Title should not be empty';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (!errorType) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setErrorType(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorType, setErrorType]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorType,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorType(null)}
      />
      {getErrorMessage()}
    </div>
  );
};
