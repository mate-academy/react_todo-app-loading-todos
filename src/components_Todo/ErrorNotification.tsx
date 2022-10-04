import classNames from 'classnames';
import { useEffect } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  hasLoadError: boolean;
  setHasLoadError: (event: boolean) => void;
}

export const ErrorNotification: React.FC<Props> = ({
  hasLoadError,
  setHasLoadError,
}) => {
  const clouseError = () => {
    setHasLoadError(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoadError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hasLoadError },
      )}
    >

      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clouseError}
      />
      {hasLoadError && (
        'Unable to load a todo'
      )}
    </div>
  );
};
