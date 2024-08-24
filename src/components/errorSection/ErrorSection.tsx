import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { useTodosContext } from '../../context/context';

export const ErrorSection: FC = () => {
  const { errorMessage, setErrorMessage } = useTodosContext();

  useEffect(() => {
    let mistakeTimer = 0;

    if (errorMessage) {
      mistakeTimer = window.setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      window.clearTimeout(mistakeTimer);
    };
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
