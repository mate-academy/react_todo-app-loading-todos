import React from 'react';
import cn from 'classnames';

export type Props = {
  errorMessage: string | null;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  const defaultClassNames =
    'notification is-danger is-light has-text-weight-normal';

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(defaultClassNames, {
        hidden: !errorMessage,
      })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
