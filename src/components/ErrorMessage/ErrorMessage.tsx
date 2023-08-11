import React from 'react';
import cn from 'classnames';
import { ErrorMessages } from '../../types/errorMessages';

type Props = {
  errorMessage: ErrorMessages | '';
  hasError: boolean;
  onHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  hasError,
  onHasError,
}) => {
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

      {errorMessage}
    </div>
  );
};
