import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  currError: string;
  setCurrError: React.Dispatch<React.SetStateAction<string>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
};

export const Errors: React.FC<Props> = ({
  currError,
  setCurrError,
  hasError,
  setHasError,
}) => {
  const timer = useRef<NodeJS.Timer>();

  const clearError = useCallback(
    () => {
      setCurrError('');
      setHasError(false);
    },
    [currError],
  );

  useEffect(() => {
    if (hasError) {
      timer.current = setTimeout(clearError, 3000);
    } else {
      clearTimeout(timer.current);
    }
  }, [hasError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: !hasError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Toggle All"
        onClick={clearError}
      />

      {currError}
    </div>
  );
};
