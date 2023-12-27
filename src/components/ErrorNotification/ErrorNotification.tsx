/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../libs/state';
import { Actions, ErrorMessages } from '../../libs/enums';
import { ERROR_MESSAGE_DELAY } from '../../libs/constants';

export const ErrorNotification = () => {
  const dispatch = useContext(DispatchContext);
  const { errorMessage } = useContext(StateContext);

  const timerIdRef = useRef(0);

  const hideErrorMessage = useCallback(() => {
    dispatch({
      type: Actions.setErrorMessage,
      payload: { errorMessage: ErrorMessages.NoError },
    });
  }, [dispatch]);

  const handleHideErrorMessage = () => {
    hideErrorMessage();
    window.clearTimeout(timerIdRef.current);
  };

  useEffect(() => {
    timerIdRef.current = window.setTimeout(() => {
      hideErrorMessage();
    },
    ERROR_MESSAGE_DELAY);

    return () => {
      window.clearTimeout(timerIdRef.current);
    };
  }, [hideErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideErrorMessage}
      />
      {errorMessage}
    </div>
  );
};
