import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => (
  <div
    data-cy="ErrorNotification"
    className={cn('notification is-danger is-light has-text-weight-normal', {
      hidden: !errorMessage,
    })}
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {errorMessage}
  </div>
);
