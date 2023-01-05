/* eslint-disable jsx-a11y/control-has-associated-label */

import { useEffect, useState } from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClosing = () => {
    onClose();
    setVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => (
      handleClosing()
    ), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className="
        notification
        is-danger
        is-light
        has-text-weight-normal
      "
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClosing}
      />
      {message}
    </div>
  );
};
