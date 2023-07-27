import React from 'react';
import classNames from 'classnames';

type Props = {
  hasError: string,
  setHasError: (error: string) => void,
};
export const TodoError: React.FC<Props> = ({
  hasError,
  setHasError,
}) => {
  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close"
        onClick={() => setHasError('')}
      />
      {hasError}
    </div>
  );
};
