import React, { useContext } from 'react';
import cn from 'classnames';
import { StateContext } from '../context/ContextReducer';

export const TodoAppError: React.FC = () => {
  const { error } = useContext(StateContext);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn({
        'notification is-danger is-light has-text-weight-normal': error,
        hidden: !error,
      })}
    >
      {error && (
        <button data-cy="HideErrorButton" type="button" className="delete" />
      )}
      {error}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
