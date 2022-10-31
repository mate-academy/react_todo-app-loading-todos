import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  hasLoadingError: boolean,
  setHasLoadingError: (arg: boolean) => void,
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
        aria-label="delete"
        type="button"
        data-cy="HideErrorButton"
        className="delete"
        onClick={() => setIsCLosePressed(true)}
      />
      {hasLoadingError && ('Unable to add a todo')}

      <br />
    </div>
  );
};
