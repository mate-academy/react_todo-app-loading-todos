import classNames from 'classnames';
import React, { useCallback, useContext, useEffect } from 'react';
import { CreatedContext } from './TodoContext';

export const Error = () => {
  const { state, dispatch } = useContext(CreatedContext);
  const { errors } = state;

  const hiddenError = useCallback(
    () =>
      dispatch({
        type: 'CLEAR_ERRORS',
      }),
    [dispatch],
  );

  const activeError = errors.find(curError => curError.value);

  useEffect(() => {
    if (activeError) {
      const timer = setTimeout(() => {
        hiddenError();
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [activeError, hiddenError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !activeError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hiddenError}
      />
      {activeError && <div>{activeError.errorTitle}</div>}
    </div>
  );
};
