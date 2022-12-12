import React, { useEffect } from 'react';

type Props = {
  error: string,
  onCloseError: () => void,
};

export const Error: React.FC<Props> = React.memo(({ error, onCloseError }) => {
  useEffect(() => {
    setTimeout(onCloseError, 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="delete"
        onClick={() => onCloseError()}
      />

      {error}
    </div>
  );
});
