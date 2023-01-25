/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect } from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string,
  setErrorMessage: (errorMessage: string) => void,
};

export const ErrorNotification: FC<Props> = ({
  errorMessage, setErrorMessage,
}) => {
  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />

      { errorMessage }
    </div>
  );
};
