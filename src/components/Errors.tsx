/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  hasError: boolean;
  setHasError: (value: boolean) => void;
  errorMessage: string;
};

export const Errors:React.FC<Props> = ({
  hasError,
  setHasError,
  errorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
    hidden={!hasError}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setHasError(false)}
    />

    {errorMessage}
  </div>
);
