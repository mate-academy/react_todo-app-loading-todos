import React, { useEffect } from 'react';
import '../styles/index.scss';

interface Props {
  message: string;
  onClose: () => void;
}

const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`notification is-danger is-light has-text-weight-normal ${
        message ? '' : 'hidden'
      }`}
      data-cy="ErrorNotification"
    >
      <button
        type="button"
        className="delete"
        aria-label="close"
        onClick={onClose}
        data-cy="HideErrorButton"
      />
      {message}
    </div>
  );
};

export default React.memo(ErrorNotification);
