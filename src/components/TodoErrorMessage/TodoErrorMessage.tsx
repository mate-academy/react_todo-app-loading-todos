import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string,
  removeErrorMessage: () => void,
};

export const TodoErrorMessage: React.FC<Props> = ({
  errorMessage,
  removeErrorMessage,
}) => {
  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !errorMessage,
      },
    )}
    >
      <button
        onClick={removeErrorMessage}
        type="button"
        className="delete"
      >
        x
      </button>
      {errorMessage}
    </div>
  );
};
