import classnames from 'classnames';
import { FunctionComponent, useEffect } from 'react';
import { Errors } from '../../types/Errors';

interface ErrorProps {
  error: boolean;
  setError: (error: boolean) => void;
  closeNotification: () => void;
}

export const ErrorNotification: FunctionComponent<ErrorProps> = ({
  error,
  setError,
  closeNotification,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(timer);
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
        onClick={closeNotification}
      />

      {Errors.Adding}
      <br />
      {Errors.Deleting}
      <br />
      {Errors.Updating}
    </div>
  );
};
