import React from 'react';

import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage === '',
      })}
      data-cy="ErrorNotification"
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

export default ErrorNotification;
