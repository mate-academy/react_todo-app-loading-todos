/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';

interface Props {
  onClose: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const ErrorBlock: React.FC<Props> = ({ onClose, error, setError }) => {
  useEffect(() => {
    const hideNotification = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(hideNotification);
  }, [error]);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
