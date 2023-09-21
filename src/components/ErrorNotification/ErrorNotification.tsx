/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext';

type Props = {
  // isLoadTodoError: boolean,
  // isTitleEmpty: boolean,
};

export const ErrorNotification: React.FC<Props> = () => {
  const {
    isLoadTodoError,
    isTitleEmpty,
    isUnableAddTodo,
    isUnableDeleteTodo,
    isUnableUpdateTodo,
    hasError,
    setHasError,
  } = useContext(TodosContext);

  useEffect(() => {
    setTimeout(() => setHasError(false), 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-light',
        'is-danger',
        'has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />

      {/* show only one message at a time */}
      {isLoadTodoError && (
        'Unable to load todos'
      )}

      {isTitleEmpty && (
        'Title should not be empty'
      )}

      {isUnableAddTodo && (
        'Unable to add a todo'
      )}

      {isUnableDeleteTodo && (
        'Unable to delete a todo'
      )}

      {isUnableUpdateTodo && (
        'Unable to update a todo'
      )}
    </div>
  );
};
