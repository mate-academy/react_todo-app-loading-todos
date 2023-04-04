import classNames from 'classnames';
import React, { useEffect } from 'react';

interface Props {
  errors: string[];
  onClear: () => void;
}

export const ErrorList: React.FC<Props> = ({ errors, onClear }) => {
  useEffect(() => {
    if (errors.length !== 0) {
      setTimeout(onClear, 3000);
    }
  }, [errors, onClear]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: errors.length === 0 },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="close"
        hidden={false}
        onClick={onClear}
      />

      {/* show only one message at a time */}
      {errors.map((error) => (
        <React.Fragment key={error}>
          {error}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};
