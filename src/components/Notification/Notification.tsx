import classNanes from 'classnames';
import { useState } from 'react';

export const Notification = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  setTimeout(handleError, 3000);

  return (
    <div className={classNanes(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: hasError },
    )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
      <button
        type="button"
        className="delete"
        onClick={handleError}
      />

      Unable to add a todo
      {/* <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
