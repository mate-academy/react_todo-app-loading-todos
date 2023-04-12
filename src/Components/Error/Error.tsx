import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  error: string;
  onClear: () => void;
};

export const Error: React.FC<Props> = ({ error, onClear }) => {
  useEffect(() => {
    if (error.length > 0) {
      setTimeout(onClear, 3000);
    }
  }, [error]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error.length === 0 },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onClear}
        hidden={false}
      />

      {error}
    </div>
  );
};
