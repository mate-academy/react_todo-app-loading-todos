import { useState } from 'react';
import classNames from 'classnames';

export const ErrorNotification = () => {
  const [isErrorShown, setIsErrorShown] = useState(true);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !isErrorShown,
        },
      )}
    >
      <button
        aria-label="HideErrorButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsErrorShown(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
