/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  error: boolean;
  changeError: (value: boolean) => void;
}

const ErrorNotification:React.FC<Props> = ({ error, changeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={
        error
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'notification is-danger is-light has-text-weight-normal hidden'
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => changeError(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};

export default ErrorNotification;
