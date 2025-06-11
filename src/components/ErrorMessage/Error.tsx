import React from 'react';
import cn from 'classnames';

type ErrorMessageProps = {
  errorMessage: string;
  setErrorMessage: (value: React.SetStateAction<string>) => void;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  setErrorMessage,
}) => {
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
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
