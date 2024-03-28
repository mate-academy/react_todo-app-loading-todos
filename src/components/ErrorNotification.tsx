{
  /* DON'T use conditional rendering to hide the notification */
}

{
  /* Add the 'hidden' class to hide the message smoothly */
}

import React, { useContext } from 'react';
import { ErrorContext } from './TodoContext';
import classNames from 'classnames';

type Props = {};

export const ErrorNotification: React.FC<Props> = () => {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

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
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
      {/* Unable to load todos
        Title should not be empty
        Unable to add a todo
        Unable to delete a todo
        Unable to update a todo */}
    </div>
  );
};
