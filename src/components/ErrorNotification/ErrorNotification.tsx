import { useEffect, useState } from 'react';
import classNames from 'classnames';

interface Props {
  error: string | null,
  setError: (error: string | null) => void,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
}) => {
  const [hideError, setHideError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, hideError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hideError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHideError(true)}
        aria-label="Hide error"
      />
      {error}
    </div>
  );
};
