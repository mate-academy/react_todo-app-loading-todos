import classNames from 'classnames';
import React from 'react';

type Props = {
  hiddenError: boolean;
  setHiddenError: (err: boolean) => void;
};

export const Error: React.FC<Props> = ({ hiddenError, setHiddenError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: hiddenError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHiddenError(true)}
      />
      Unable to load todos
    </div>
  );
};
