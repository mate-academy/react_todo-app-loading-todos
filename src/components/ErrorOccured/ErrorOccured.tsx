import React, { memo, useEffect } from 'react';
import cn from 'classnames';

type Props = {
  error: string;
  onChangeError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorOccured: React.FC<Props> = memo(({
  error,
  onChangeError,
}) => {
  useEffect(() => {
    setTimeout(() => onChangeError(''), 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onChangeError('')}
      />
      {error}
    </div>
  );
});
