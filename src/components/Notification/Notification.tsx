/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  errorText: string,
  hasError: boolean,
  setHasError: (param: boolean) => void,
};

export const Notification: React.FC<Props> = ({
  errorText,
  hasError,
  setHasError,
}) => {
  setTimeout(() => {
    setHasError(false);
  }, 3000);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: hasError === false,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />

      {errorText}
    </div>
  );
};
