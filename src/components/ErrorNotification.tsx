import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean,
  // setHasError: (value: boolean) => void,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ErrorNotification: React.FC<Props> = ({
  hasError, setHasError,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isPressed || !hasError },
      )}
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsPressed(true)}
      />
      {hasError && ('Unable to add a todo')}

      <br />
    </div>
  );
};
