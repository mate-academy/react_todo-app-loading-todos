/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  handleErrorClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ handleErrorClose }) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={handleErrorClose}
    />

    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
