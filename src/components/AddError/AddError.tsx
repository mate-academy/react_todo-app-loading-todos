import React, { useState } from 'react';
import cn from 'classnames';

export const AddError: React.FC = () => {
  const [closeError, setCloseError] = useState(false);

  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !closeError },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close"
        onClick={() => setCloseError(true)}
      />

      Unable to add a todo
    </div>
  );
};
