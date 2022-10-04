import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../providers/StateContext';
import { EAction } from '../../types/Action.enum';

export const ErrorMessage: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { error } = useContext(StateContext);

  let timerId: NodeJS.Timeout | undefined;

  const handleClose = () => {
    clearTimeout(timerId);
    dispatch({
      type: EAction.SET_ERROR,
      error: {
        show: false,
      },
    });
  };

  useEffect(() => {
    if (!error.show) {
      return;
    }

    timerId = setTimeout(handleClose, 3000);
  }, [error]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !error.show,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Close message"
        onClick={handleClose}
      />
      {error.message}
    </div>
  );
};
