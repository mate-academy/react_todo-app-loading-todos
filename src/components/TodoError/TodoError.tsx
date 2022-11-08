import React from 'react';

type Props = {
  errorText?: string;
  closingError: () => void;
};

export const TodoError: React.FC<Props> = ({ errorText, closingError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={closingError}
      />

      {errorText || 'Something went wrong'}
    </div>
  );
};
