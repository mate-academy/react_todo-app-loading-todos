import React from 'react';
import { ErrorMessage } from './types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage | '';
  onHide: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onHide,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${
        errorMessage ? '' : 'hidden'
      }`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {errorMessage}
    </div>
  );
};
