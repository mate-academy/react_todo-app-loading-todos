import React, { memo } from 'react';
import cn from 'classnames';

type Props = {
  errorText: string
};

export const ErrorNotification: React.FC<Props> = memo(({ errorText }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !errorText })}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorText}
    </div>
  );
});
