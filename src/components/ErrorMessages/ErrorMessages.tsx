import React, { useState } from 'react';
import cn from 'classnames';

export const ErrorMessages: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: isHidden,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Hide errors"
        onClick={() => {
          setIsHidden(true);
        }}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
