import React from 'react';

type Props = {
  hidden: boolean;
  message: string;
  onClose: () => void;
  dataCy?: string; // optional to allow flexibility
};

export const UserWarning: React.FC<Props> = ({
  hidden,
  message,
  onClose,
  dataCy = 'ErrorNotification',
}) => {
  return (
    <div
      className={`notification ${hidden ? 'hidden' : ''}`}
      data-cy={dataCy}
      role="alert"
      aria-hidden={hidden}
    >
      <button
        type="button"
        className="delete"
        data-cy="HideErrorButton"
        aria-label="Hide error"
        onClick={onClose}
      />
      <span>{message}</span>
    </div>
  );
};
