import { useEffect } from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

export const ErrorMessange: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 300);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${
        message ? '' : 'hidden'
      }`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          onClose();
        }}
      />
      {/* show only one message at a time */}
      {message}
    </div>
  );
};
