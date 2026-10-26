import { useEffect, useState } from 'react';
import { Error } from '../../types/Error';
import classNames from 'classnames';

type Props = {
  error: Error | null;
};

export const ErrorNotification = ({ error }: Props) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!error) {
      setShowError(false);

      return;
    }

    setShowError(true);

    const timeoutId = window.setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [error]);

  const getErrorText = () => {
    switch (error) {
      case 'loadTodo':
        return 'Unable to load todos';
      case 'emptyTitle':
        return 'Title should not be empty';
      case 'addTodo':
        return 'Unable to add a todo';
      case 'deleteTodo':
        return 'Unable to delete a todo';
      case 'updateTodo':
        return 'Unable to update a todo';
      default:
        return '';
    }
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !showError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowError(false)}
      />
      {getErrorText()}
    </div>
  );
};
