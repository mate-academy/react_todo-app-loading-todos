import { useEffect } from 'react';
import classNames from 'classnames';
import { useTodos } from '../../context';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const ErrorList = () => {
  const { errors, setErrors } = useTodos();

  useEffect(() => {
    setTimeout(() => {
      setErrors(null);
    }, 3000);
  }, [errors]);

  const handleClick = () => {
    setErrors(null);
  };

  //  {/* Notification is shown in case of any error */}
  // {/* Add the 'hidden' class to hide the message smoothly */}

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errors },
      )}
      style={{ transition: 'hidden 1s linear' }}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="hide error"
        onClick={handleClick}
      />
      {/* show only one message at a time */}
      {errors}
    </div>
  );
};

export default ErrorList;
