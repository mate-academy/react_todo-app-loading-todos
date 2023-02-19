/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  errorType: string;
  isError: boolean;
  setIsError: (bool: boolean) => void;
};

export const Notifications: React.FC<Props> = ({
  errorType,
  isError,
  setIsError,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const clearNotification = () => {
    const timerId = window.setTimeout(() => {
      setIsHidden(true);
      setIsError(false);
    }, 3000);

    window.clearTimeout(timerId);
  };

  useEffect(() => {
    if (isError) {
      setIsHidden(false);
      clearNotification();
    }
  }, [isError]);

  const handleCloseButton = () => {
    setIsHidden(true);
  };

  return (
    <div className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={handleCloseButton}
      />

      <p>{`Unable to ${errorType} a todo`}</p>
    </div>
  );
};
