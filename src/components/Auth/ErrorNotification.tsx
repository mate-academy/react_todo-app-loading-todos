/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';

type Props = {
  errorPush: boolean;
  errorMessage: string;
  setErrorPush: (value: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorPush,
  errorMessage,
  setErrorPush,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !errorPush })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorPush(!errorPush)}
      />

      {errorMessage}
    </div>
  );
};
