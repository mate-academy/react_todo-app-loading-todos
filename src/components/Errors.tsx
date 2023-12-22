import React from 'react';
import cn from 'classnames';
import { ErrorType } from '../types/Errors';

interface Props {
  errorMessage: ErrorType | null,
  steErrorMessage: (error: ErrorType | null)=> void;
}

export const Notifications: React.FC<Props> = (props) => {
  const { errorMessage, steErrorMessage } = props;

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
        onClick={() => steErrorMessage(null)}
      />
      {errorMessage}
    </div>
  );
};
