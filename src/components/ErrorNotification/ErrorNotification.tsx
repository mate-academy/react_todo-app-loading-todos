import { useState, useEffect } from 'react';
import cn from 'classnames';

type Props = {
  message: string;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleErrorClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          handleErrorClose();
        }}
      />
      {message}
    </div>
  );
};
