import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { Error } from '../types/Error';
import React from 'react';

type Props = {
  error: Error | null;
  setError: (item: Error | null) => void;
};

const TodoError: React.FC<Props> = ({ error, setError }) => {
  const errorMessage = useMemo(() => {
    switch (error) {
      case Error.LoadError:
        return 'Unable to load todos';
      case Error.EmptyTitle:
        return 'Title should not be empty';
      case Error.TodoAddError:
        return 'Unable to add a todo';
      case Error.TodoDeleteError:
        return 'Unable to delete a todo';
      case Error.TodoUpdateError:
        return 'Unable to update a todo';
      default:
        return null;
    }
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error, setError]);

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
      {errorMessage}
    </div>
  );
};

export default TodoError;
