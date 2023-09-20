/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { ErrorMessage } from '../../utils/errorMessages';

type Props = {
  setErrorMessages: (value: ErrorMessage) => void;
  errorMessages: ErrorMessage;
};

export const ErrorNotification: React.FC<Props> = ({
  setErrorMessages,
  errorMessages,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: errorMessages === ErrorMessage.Default },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessages(ErrorMessage.Default)}
      />

      {errorMessages}
    </div>
  );
};
