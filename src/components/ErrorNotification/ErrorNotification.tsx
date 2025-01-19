import classNames from 'classnames';
import React, { useEffect } from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  setErrorMessage: (errorMessage: ErrorMessage) => void;
};

export const ErrorNotification: React.FC<Props> = props => {
  const { errorMessage, setErrorMessage } = props;

  useEffect(() => {
    if (errorMessage === ErrorMessage.Default) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(ErrorMessage.Default);
    }, 4000);

    return () => clearTimeout(timer);
  }, [errorMessage, setErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(ErrorMessage.Default)}
      />
      {errorMessage}
    </div>
  );
};
