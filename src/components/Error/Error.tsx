import React from 'react';
import cn from 'classnames';

type Props = {
  error: string | null;
};

const Error: React.FC<Props> = React.memo(({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error}
      <br />
    </div>
  );
});

Error.displayName = 'Error';
export default Error;
