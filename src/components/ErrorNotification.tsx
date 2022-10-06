import classnames from 'classnames';
import { useEffect } from 'react';

type Props = {
  error: boolean,
  setError: (value: boolean) => void,
  errorText: string;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
  errorText,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(() => setError(false), 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classnames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="close"
        onClick={() => setError(false)}
      />

      {errorText}
    </div>
  );
};
