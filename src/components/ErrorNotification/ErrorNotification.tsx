import React from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  isHiddenErrorMessage: boolean;
};

export const ErrorNotifications: React.FC<Props> = ({
  errorMessage,
  isHiddenErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHiddenErrorMessage },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
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
