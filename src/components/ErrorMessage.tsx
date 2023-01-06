import classNames from 'classnames';
import React from 'react';
import { Error } from '../types/Error';

type Props = {
  errorType: Error | null;
  closeError: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ errorType, closeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        ' is-danger',
        ' is-light',
        ' has-text-weight-normal',
        { hidden: !errorType },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={closeError}
        aria-label="forbiddenTodo"
      />

      {`${errorType}`}
    </div>
  );
};
