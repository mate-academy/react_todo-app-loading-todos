import React, { Dispatch, SetStateAction, useEffect } from 'react';
import cn from 'classnames';
import { TodoError } from '../types/TodoError';

type Props = {
  error: TodoError;
  setError: Dispatch<SetStateAction<TodoError>>;
};

export const Error: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError(TodoError.None);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(TodoError.None)}
      />
      {error}
    </div>
  );
};
