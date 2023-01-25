import React, { FC } from 'react';

type Props = {
  message: string
  closeButton:() => void
};

export const ErrorMessage:FC<Props> = React.memo(({ message, closeButton }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeButton()}
      />

      {message}
      <br />
    </div>
  );
});
