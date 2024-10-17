import React from 'react';
import { ErrorMessages } from '../types/ErrorTypes';
import cn from 'classnames';

interface Props {
  errorMessage: ErrorMessages;
}

export const ErrorPannel: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className={cn('delete', { hidden: !errorMessage })}
      />
      {errorMessage}
    </div>
  );
};
