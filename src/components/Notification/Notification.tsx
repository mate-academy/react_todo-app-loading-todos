import React from 'react';
import cn from 'classnames';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  hasError: boolean,
  errorMessage: ErrorMessages,
  onHasError: (isError: boolean) => void,
};

export const Notification: React.FC<Props> = ({
  hasError,
  errorMessage,
  onHasError,
}) => (
  <div
    className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hasError },
    )}
  >
    <button
      type="button"
      aria-label="button"
      className="delete"
      onClick={() => onHasError(false)}
    />

    {errorMessage}
  </div>
);
