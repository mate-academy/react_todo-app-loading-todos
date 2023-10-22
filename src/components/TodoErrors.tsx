/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../states/Global';
import { ActionType } from '../states/Reducer';

export const TodoErrors: React.FC = () => {
  const { errors } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isError = useMemo(() => {
    return Object.values(errors).some(error => error);
  }, [errors]);

  const resetErrors = () => dispatch(
    {
      type: ActionType.ResetErrors,
      payload: { },
    },
  );

  return (
    // Notification is shown in case of any error
    // Add the 'hidden' class to hide the message smoothly
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger is-light',
        'has-text-weight-normal', {
          hidden: !isError,
        },
      )}
    >

      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={resetErrors}
      />

      {errors.loadError && 'Unable to load todos'}

      {errors.titleError && (
        <>
          <br />
          Title should not be empty
        </>
      )}

      {errors.createError && (
        (
          <>
            <br />
            Unable to add a todo
          </>
        )
      )}

      {errors.deleteError && (
        (
          <>
            <br />
            Unable to delete a todo
          </>
        )
      )}

      {errors.updateError && (
        (
          <>
            <br />
            Unable to update a todo
          </>
        )
      )}
    </div>
  );
};
