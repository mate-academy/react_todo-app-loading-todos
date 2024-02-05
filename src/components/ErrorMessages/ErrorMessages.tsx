import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const ErrorMessages: React.FC = () => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowError(false), 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !showError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Delete"
        onClick={() => setShowError(false)}
      />
      Unable to load todos
      {/* show only one message at a time
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
