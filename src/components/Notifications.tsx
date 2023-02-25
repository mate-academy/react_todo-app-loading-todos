import React from 'react';
import cn from 'classnames';

type Props = {
  hasError: boolean,
  errorMessage: string
  setHasError: (value: boolean) => void,
};

export const Notification: React.FC<Props> = ({
  hasError,
  errorMessage,
  setHasError,
}) => {
  return (
    <div
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        type="button"
        aria-label="Clear error"
        className="delete"
        onClick={() => setHasError(false)}
      />
      {errorMessage}
    </div>
  );
};
