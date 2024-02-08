import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../management/TodoContext';

export const Error: React.FC = () => {
  const { errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [smoothly, setSmoothly] = useState(false);

  const closeMessageError = () => {
    setSmoothly(true);
  };

  setTimeout(() => {
    setSmoothly(true);
  }, 3000);

  setTimeout(() => {
    dispatch({
      type: 'errorMessage',
      payload: '',
    });
  }, 4000);

  return (
    <div
      hidden={!errorMessage}
      data-cy="ErrorNotification"
      className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: smoothly,
        })
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="close error message"
        onClick={closeMessageError}
      />
      {/* show only one message at a time */}
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
