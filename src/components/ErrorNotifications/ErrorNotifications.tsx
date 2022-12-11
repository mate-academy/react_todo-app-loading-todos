import classNames from 'classnames';
import React from 'react';

type Props = {
  currentError: string;
  resetCurrentError: () => void;
  hasError: boolean;
};

export const ErrorNotification: React.FC<Props> = (props) => {
  const { currentError, resetCurrentError, hasError } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !hasError,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={resetCurrentError}
      />
      {`Unable to ${currentError} a todo`}
    </div>
  );
};
