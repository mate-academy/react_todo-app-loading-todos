import React from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean;
  onErrorChange: (isError: boolean) => void;
};

export const ErrorsNotification: React.FC<Props> = ({
  hasError,
  onErrorChange,
}) => {
  const handleCloseButtonClick = () => {
    onErrorChange(false);
  };

  return (
    /* Notification is shown in case of any error */
    /* Add the 'hidden' class to hide the message smoothly */
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hasError },
    )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={handleCloseButtonClick}
      />
      Server is unavailable
    </div>
  );
};

// {/* show only one message at a time */}
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
