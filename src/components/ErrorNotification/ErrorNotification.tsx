import classNames from 'classnames';
import React from 'react';
import { IsError } from '../../types/IsError';

interface Props {
  isError: IsError,
  setIsError: (IsError: IsError) => void,
}

export const ErrorNotification: React.FC<Props> = ({ isError, setIsError }) => {
  const error = Object.entries(isError);
  const errorName = error.find(el => el[1] === true);

  const handleClose = () => {
    setIsError({ ...isError, loadError: false });
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error.some(el => el[1] === true) },
        )
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Mute volume"
        onClick={handleClose}
      />

      {(error && errorName !== undefined) && `Unable to ${errorName[0].slice(0, -5)} a todo`}

    </div>
  );
};
