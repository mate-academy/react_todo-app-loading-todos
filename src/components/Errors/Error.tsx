/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  isError: boolean,
  errorMessage: string,
  handlerError: (checked: boolean) => void
};

export const Error: React.FC<Props> = (
  { isError, errorMessage, handlerError },
) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isError },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => handlerError(false)}
      />
      {errorMessage}
    </div>
  );
};
