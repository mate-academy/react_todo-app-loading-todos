import classNames from 'classnames';
import React from 'react';

type Props = {
  error: boolean,
  errorNotice: string,
  hasError: (state: boolean) => void,
};

export const Notification: React.FC<Props> = ({
  error,
  errorNotice,
  hasError,
}) => {
  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        aria-label="btn"
        type="button"
        className="delete"
        onClick={() => hasError(false)}
      />

      {errorNotice}
    </div>
  );
};
