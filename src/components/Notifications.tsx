import React, { useEffect, useState } from 'react';

interface Props {
  message: string | null;
  onClose: () => void;
}

export const Notifications: React.FC<Props> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!isVisible ? 'hidden' : ''}`}
    >
      {message}
      <button onClick={onClose}>{message}</button>
    </div>
  );
};
