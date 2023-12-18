import { useEffect } from 'react';
import { getErrorMessage } from '../../helpers';
import { ErrorType } from '../../types/ErorTypes';

type Props = {
  error: ErrorType | null;
  onClose: () => void;
};

export const Errors: React.FC<Props> = ({ error, onClose }) => {
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"

    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
        aria-label="Close message"
      />
      {errorMessage}
    </div>
  );
};
