import React from 'react';
import classNames from 'classnames';

type Props = {
  error: boolean;
  errorNotification: string;
  handlerErrorNotification: (boolean: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  errorNotification,
  handlerErrorNotification,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error === false },
      )}
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handlerErrorNotification(false)}
      />
      {errorNotification}
    </div>
  );
};
