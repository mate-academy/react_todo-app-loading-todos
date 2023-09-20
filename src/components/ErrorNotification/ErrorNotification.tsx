import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  // eslint-disable-next-line no-lone-blocks
  { /* Notification is shown in case of any error */ }

  // eslint-disable-next-line no-lone-blocks
  { /* Add the 'hidden' class to hide the message smoothly */ }

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessage}
    </div>
  );
};
