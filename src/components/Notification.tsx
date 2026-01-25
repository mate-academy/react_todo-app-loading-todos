import React, { useEffect, useState } from 'react';

type Props = {
  message: string;
  onClose: () => void;
};

export const Notification: React.FC<Props> = ({ message, onClose }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (message) {
      setHidden(false);
      const timer = setTimeout(() => {
        setHidden(true);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      className={`notification notification--error ${hidden ? 'hidden' : ''}`}
    >
      <span>{message}</span>
      {/* tylko jeden przycisk "x" */}
      <button
        type="button"
        className="notification__close"
        onClick={() => {
          setHidden(true);
          onClose();
        }}
      >
        ×
      </button>
    </div>
  );
};
