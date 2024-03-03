import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../managment/TodoContext';

export const Error: React.FC = () => {
  const { errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [smoothly, setSmoothly] = useState(false);

  const closeMessageError = () => {
    setSmoothly(true);
  };

  setTimeout(() => {
    setSmoothly(true);
  }, 1000);

  setTimeout(() => {
    dispatch({
      type: 'errorMessage',
      payload: '',
    });
  }, 2000);

  return (
    <div
      hidden={!errorMessage}
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: smoothly,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="close error message"
        onClick={closeMessageError}
      />
      {errorMessage}
      {/* <br />
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
