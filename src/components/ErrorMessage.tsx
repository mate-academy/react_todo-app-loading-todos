import React from 'react';
import classNames from 'classnames';

type Props = {
  error: boolean,
  closeError: (error: boolean) => void,
};

export const ErrorMessage: React.FC<Props> = ({ error, closeError }) => {
  const handleСloseError = () => closeError(true);

  setTimeout(() => closeError(true), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
        { hiden: error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleСloseError}
      />
      Unable to load todos
    </div>
  );
};
