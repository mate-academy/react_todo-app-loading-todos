/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
  resetError: (value: Error) => void;
};

export const TodoError: React.FC<Props> = ({ error, resetError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification',
        'is-danger', 'is-light',
        'has-text-weight-normal',
        { hidden: error === Error.Default })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => resetError(Error.Default)}
      />
      {/* show only one message at a time */}
      {error === Error.UnableLoadTodos && (
        <>
          Unable to load todos
        </>
      )}
      {error === Error.TitleNotEmpty && (
        <>
          <br />
          Title should not be empty
        </>
      )}
      {error === Error.UnableAddTodo && (
        <>
          <br />
          Unable to add a todo
        </>
      )}
      {
        error === Error.UnableDeleteTodo && (
          <>
            <br />
            Unable to delete a todo
          </>
        )
      }
      {error === Error.UnableUpdateTodo && (
        <>
          <br />
          Unable to update a todo
        </>

      )}

    </div>
  );
};
