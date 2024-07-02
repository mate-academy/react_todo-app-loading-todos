import React, { useContext } from 'react';
import cn from 'classnames';

import { StateContext, DispatchContext } from '../store/TodoContext';

import { ActionType } from '../types/Actions';

export const Error: React.FC = () => {
  const { errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function clearError() {
    dispatch({ type: ActionType.SetErrorMessage, payload: '' });
  }

  return (
    <>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={clearError}
        />
        Unable to load todos
      </div>
    </>
  );
};
