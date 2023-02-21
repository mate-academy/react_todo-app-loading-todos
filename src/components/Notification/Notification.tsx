import cn from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  error: string,
  hasError: boolean,
  changeError: (status: boolean) => void,
};

export const Notification: React.FC<Props> = React.memo(({
  error,
  hasError,
  changeError,
}) => {
  useEffect(() => {
    if (hasError) {
      const timerId = window.setTimeout(() => {
        window.clearTimeout(timerId);
        changeError(false);
      }, 3000);
    }
  }, [hasError]);

  return (
    <div
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete button"
        onClick={() => {
          changeError(false);
        }}
      />

      {hasError && `${error}`}
    </div>
  );
});
