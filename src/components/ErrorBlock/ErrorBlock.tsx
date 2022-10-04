import React from 'react';
import classNames from 'classnames';

type Props = {
  errorText: string,
  hasError: boolean,
  setHasError: (errorNotification: boolean) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  errorText,
  hasError,
  setHasError,
}) => {
  if (hasError) {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />
      {errorText}
    </div>
  );
};
