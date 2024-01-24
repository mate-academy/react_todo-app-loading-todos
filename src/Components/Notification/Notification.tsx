import { useContext } from 'react';
import classNames from 'classnames';

import { Context } from '../../Context';
import { ErrorMessage } from '../../types/ErrorMessage';

export const Notification = () => {
  const { errorMessage, handleErrorChange } = useContext(Context);

  return (
    <>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: errorMessage === ErrorMessage.NULL,
          },
        )}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleErrorChange(ErrorMessage.NULL)}
        />

        {errorMessage}
      </div>
    </>
  );
};
