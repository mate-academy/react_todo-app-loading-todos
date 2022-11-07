import React from 'react';
import classNames from 'classnames';

type Props = {
  hidden: boolean,
  handlerCloseErrors: () => void,
  errorMessage: string | null,
};

export const Error:React.FC<Props> = React.memo(({
  hidden,
  handlerCloseErrors,
  errorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handlerCloseErrors}
        aria-label="button-hide Errors"
      />

      {errorMessage}
    </div>
  );
});
