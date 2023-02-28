import React from 'react';

type Props = {
  closeErrorHandler: () => void,
  errors: string
};

export const ErrorNotification: React.FC<Props> = ({
  closeErrorHandler,
  errors,
}) => {
  setTimeout(() => {
    closeErrorHandler();
  }, 3000);

  const showError = () => {
    switch (errors) {
      case 'add':
        return 'Unable to add a todo';
      case 'delete':
        return 'Unable to delete a todo';
      case 'update':
        return 'Unable to update a todo';
      default:
        return 'Unexpected error';
    }
  };

  return (
    <>
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          aria-label="Close error"
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorHandler}
        />

        {showError()}
      </div>
    </>
  );
};
