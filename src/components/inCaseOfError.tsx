import React from 'react';
import { Errors } from '../types/Errors';

interface Props {
  error: Errors;
  closeError: () => void;
}

export const InCaseOfError: React.FC<Props> = ({ error, closeError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        className="delete"
        onClick={closeError}
      >
        {error}
      </button>
    </div>
  );
};
