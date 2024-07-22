import classNames from 'classnames';
import React from 'react';

type Props = {
  showNotification: boolean;
  errorMessage: string;
  deleteNotification: (arg: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  showNotification,
  errorMessage,
  deleteNotification,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: showNotification,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => deleteNotification(true)}
      />
      {errorMessage}
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
