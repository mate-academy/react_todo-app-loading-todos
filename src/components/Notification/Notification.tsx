import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../../State/State';

export const Notification = () => {
  const { errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'setError', payload: null });
    }, 3000);
  }, [errorMessage, dispatch]);

  return (
    // {/* Notification is shown in case of any error */}
    // {/* Add the 'hidden' class to hide the message smoothly */}
    <>
      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            aria-label="hide notification"
          />
          {errorMessage}

          {/* show only one message at a time */}
          {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br /> */}
        </div>
      )}
    </>
  );
};
