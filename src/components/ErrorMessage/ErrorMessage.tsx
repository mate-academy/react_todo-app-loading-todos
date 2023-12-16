/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  message: string | null;
  onClose: () => void;
}

const ErrorMessage: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div
      className={`notification is-danger is-light has-text-weight-normal ${
        message ? '' : 'hidden'
      }`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {message}
    </div>
  );
};

export default ErrorMessage;
