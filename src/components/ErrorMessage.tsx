import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  errorMessage: string,
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
}) => {
  const [hiddenError, setHiddenError] = useState(false);

  if (errorMessage) {
    setTimeout(() => setHiddenError(true), 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: hiddenError,
        },
      )}

    >
      <button
        aria-label="a problem"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHiddenError(true)}
      />
      {errorMessage}
    </div>
  );
};
