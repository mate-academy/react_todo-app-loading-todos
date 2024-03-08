import classNames from 'classnames';
import React, { useEffect } from 'react';

interface Props {
  errorMassage: string;
  removeError: () => void;
}

export const CustomError: React.FC<Props> = ({ errorMassage, removeError }) => {
  const handleClick = () => {
    removeError();
  };

  useEffect(() => {
    window.setTimeout(() => {
      removeError();
    }, 3000);
  }, [errorMassage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMassage },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClick}
      />
      {errorMassage}
    </div>
  );
};
