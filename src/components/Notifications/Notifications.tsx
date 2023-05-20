import classNames from 'classnames';
import { useState } from 'react';

export const Notifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleError = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isVisible },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={handleError}
        aria-label="delete"
      />

      {`Unable to add a todo`}

    </div>
  );
};
