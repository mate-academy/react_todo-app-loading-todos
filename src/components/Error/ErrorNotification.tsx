import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  errorMessage: string
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  const [isError, setIsError] = useState(false);

  setTimeout(() => {
    setIsError(true);
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isError },
      )}
    >
      <button
        aria-label="hideButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(true)}
      />

      {errorMessage}
    </div>
  );
};
