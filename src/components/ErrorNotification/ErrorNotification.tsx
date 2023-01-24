import React, { memo, useEffect } from 'react';
import cn from 'classnames';

type Props = {
  error: string;
  onChangeErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorNotification: React.FC<Props> = memo(({
  error,
  onChangeErrorMessage,
}) => {
  useEffect(() => {
    setTimeout(() => onChangeErrorMessage(''), 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !error })}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onChangeErrorMessage('')}
      />
      {error}
    </div>
  );
});
