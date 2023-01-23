import React, { memo } from 'react';
import cn from 'classnames';

type Props = {
  error: string,
  closeNotification: (value: string) => void,
};

export const ErrorNotification: React.FC<Props> = memo((props) => {
  const { error, closeNotification } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeNotification('')}
      />
      {error}
    </div>
  );
});
