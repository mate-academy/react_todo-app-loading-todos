/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error | null;
  setError: (v: Error | null) => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  const errorMsg = useMemo(() => {
    switch (error) {
      case Error.LoadError:
        return 'Unable to load todos';
      case Error.EmptyTitle:
        return 'Title should not be empty';
      case Error.AddTodoError:
        return 'Unable to add a todo';
      case Error.DeleteTodoError:
        return 'Unable to delete a todo';
      case Error.UpdateTodoError:
        return 'Unable to update a todo';
      default:
        return null;
    }
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {errorMsg}
    </div>
  );
};
