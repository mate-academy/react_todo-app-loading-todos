/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  onClose: (errorStatus: boolean) => void;
  isError: boolean;
};

export const ErrorMessage: React.FC<Props> = ({ onClose, isError }) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
    hidden={!isError}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onClose(false)}
    />

    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
