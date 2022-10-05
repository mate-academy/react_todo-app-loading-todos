import { useEffect } from 'react';
import classnames from 'classnames';

type Props = {
  error: boolean;
  handleError: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (value: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  error,
  handleError,
  errorMessage,
  setErrorMessage,
}) => {
  useEffect(() => {
    const timeout = window.setTimeout(() => setErrorMessage(''), 3000);

    return () => {
      window.clearInterval(timeout);
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
        aria-label="Hide Error"
        onClick={() => handleError(false)}
      />
      {errorMessage}
    </div>
  );
};
