import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  errorMessage: string;
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleClose = () => {
    setIsHidden(true);
  };

  useEffect(() => {
    if (errorMessage) {
      setIsHidden(false);

      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        isHidden && 'hidden',
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClose}
      />
      {errorMessage}
    </div>
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
