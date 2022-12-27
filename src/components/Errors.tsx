import classNames from 'classnames';
import React, { useEffect, useRef, useCallback } from 'react';

type Props = {
  currError: string;
  setCurrError: React.Dispatch<React.SetStateAction<string>>;
};

export const Errors: React.FC<Props> = ({ currError, setCurrError }) => {
  const timer = useRef<NodeJS.Timer>();

  const closeError = useCallback(
    () => {
      setCurrError('');
    },
    [currError],
  );

  useEffect(() => {
    if (currError !== '') {
      timer.current = setTimeout(closeError, 3000);
    } else {
      clearTimeout(timer.current);
    }
  }, [currError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: currError === '',
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Toggle All"
        onClick={closeError}
      />

      {currError}
    </div>
  );
};
