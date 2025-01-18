/* DON'T use conditional rendering to hide the notification */
/* Add the 'hidden' class to hide the message smoothly */
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface ErrorsProps {
  error: string;
}

export const Errors: React.FC<ErrorsProps> = ({ error }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (error.length !== 0) {
      setIsErrorVisible(true);

      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  }, [error]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error.length === 0 || !isErrorVisible },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error}
    </div>
  );
};
