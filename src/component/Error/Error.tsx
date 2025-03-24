import React from 'react';
import cn from 'classnames';
type Props = {
  errorMessege: string | null;
  setError: (value: string | null) => void;
};

export const Error: React.FC<Props> = ({ errorMessege, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger is-light',
        'has-text-weight-normal',
        { hidden: errorMessege === null },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {errorMessege}
    </div>
  );
};
