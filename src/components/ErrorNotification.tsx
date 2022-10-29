/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  hasLoadingError: boolean,
  setHasLoadingError: (arg: any) => void,
};

export const ErrorNotification = (
  {
    hasLoadingError,
    setHasLoadingError,
  }: Props,
) => {
  const [isClosePressed, setIsCLosePressed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasLoadingError(false);
    }, 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hasLoadingError || isClosePressed },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsCLosePressed(true)}
      />
      {hasLoadingError && ('Unable to add a todo')}

      <br />
      {/* Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
