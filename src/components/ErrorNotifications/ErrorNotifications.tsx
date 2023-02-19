import React from 'react';
import classNames from 'classnames';

type Props = {
  showError: boolean;
  setError: (value: boolean) => void;
};

export const ErrorNotifications: React.FC<Props> = (
  {
    showError,
    setError,
  },
) => {
  const handleCloseButtonClick = () => {
    setError(false);
  };

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !showError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Delete"
        onClick={() => handleCloseButtonClick()}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
