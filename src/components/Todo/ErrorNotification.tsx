import React from 'react';
import { useTodoApi, useTodoError } from './Context';
import classNames from 'classnames';

export const ErrorNotification = () => {
  const { errorMessage, errorShown } = useTodoError();
  const { handleClearError } = useTodoApi();

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorShown },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClearError}
      />
      {errorMessage}
    </div>
  );
};
