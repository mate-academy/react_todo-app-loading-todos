import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = setTimeout(onClose, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !isVisible,
        },
      )}
    >
      <button
        type="button"
        data-cy="HideErrorButton"
        className="delete"
        onClick={onClose}
      />
      Unable to load todos
    </div>
  );
};
