import React from 'react';
import cn from 'classnames';

type Props = {
  hasError: boolean;
  onHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorMessage: React.FC<Props> = ({ hasError, onHasError }) => {
  return (
    <div className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hasError },
    )}
    >
      <button
        type="button"
        aria-label="Close"
        className="delete"
        onClick={() => onHasError(false)}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
