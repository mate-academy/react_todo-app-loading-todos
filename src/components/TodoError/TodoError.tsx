/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import cn from 'classnames';

import { Error } from '../../types/Error';

type Props = {
  todoError: Error | null;
  setTodoError: (error: Error | null) => void;
};

export const TodoError: React.FC<Props> = ({
  todoError,
  setTodoError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setTodoError(null);
    }, 3000);
  }, [todoError, setTodoError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !todoError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setTodoError(null)}
      />
      {todoError}
    </div>
  );
};
