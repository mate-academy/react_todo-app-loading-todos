import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  errorMessage: string;
};

export const Hidden: React.FC<Props> = ({ errorMessage }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(!errorMessage);

    // Hide the error after 3000 ms (3 seconds)
    const timeout = setTimeout(() => {
      setHidden(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const hideError = () => {
    setHidden(true);
  };

  return (
    <>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal', {
            hidden,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {errorMessage}
        {/* show only one message at a time
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </>
  );
};
