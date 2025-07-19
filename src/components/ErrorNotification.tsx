import React from 'react';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  message: ErrorMessage | '';
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${message ? '' : 'hidden'}`}
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
