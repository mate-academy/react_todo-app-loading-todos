/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  errorMessage: string;
  setErrorMessage: (value: string) => void;
};

export const Errors:React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setErrorMessage('')}
    />

    {errorMessage}
  </div>
);
