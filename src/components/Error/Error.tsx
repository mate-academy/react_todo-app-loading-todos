import React from 'react';
import cn from 'classnames';
import { ErrorType } from '../../types/Errors';

type Props = {
  errorMessage: ErrorType | null,
  setErrorMessage: (error: ErrorType | null)=> void;
};

export const Error: React.FC<Props> = (props) => {
  const { errorMessage, setErrorMessage } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >

      <button
        aria-label="Hide Notification"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(null)}
      />
      {errorMessage}
    </div>
  );
};
