import React from 'react';
import { IsError } from '../../types/IsError';

interface Props {
  isError: IsError,
  setIsError: (IsError: IsError) => void,
}

export const ErrorNotification: React.FC<Props> = ({ isError, setIsError }) => {
  const error = Object.entries(isError);
  const errorName = error.find(el => el[1] === true);
  const justErrorName = errorName && errorName[0].slice(0, -5);

  const handleClose = () => {
    setIsError({ ...isError, loadError: false });
  };

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Mute volume"
        onClick={handleClose}
      />

      {(errorName !== undefined) && `Unable to ${justErrorName} a todo`}

    </div>
  );
};
