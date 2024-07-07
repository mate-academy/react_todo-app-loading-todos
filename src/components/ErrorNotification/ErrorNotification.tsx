import React from 'react';
import cn from 'classnames';

interface Props {
  errorMessage: string;
  onErrorMessage: (val: string) => void;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onErrorMessage,
}) => {
  setTimeout(() => onErrorMessage(''), 3000);

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
        onClick={() => onErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
