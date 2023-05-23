import { useState } from 'react';
import cn from 'classnames';
import { ErrorOption } from '../../types/ErrorOption';

export const Alert = () => {
  const [hasAlertError, setHasAlertError] = useState(false);

  const handleAlertError = () => {
    setHasAlertError(true);
  };

  setTimeout(handleAlertError, 3000);

  return (
    <div
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: hasAlertError,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        aria-label="Close"
        className="delete"
        onClick={handleAlertError}
      />

      {ErrorOption.ADD}
    </div>
  );
};

export default Alert;
