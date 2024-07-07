import React from 'react';

type Props = {
  messageError: string;
  onSetError: (val: string) => void;
};

export const Notification: React.FC<Props> = ({ messageError, onSetError }) => {
  setTimeout(() => onSetError(''), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!messageError && 'hidden'}`}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {messageError}
      <br />
      {/* Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
