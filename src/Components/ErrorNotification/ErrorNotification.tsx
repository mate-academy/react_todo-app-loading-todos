import cn from 'classnames';
import { useEffect, useState } from 'react';

type ErrorNotificationProps = {
  messege: string;
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  messege,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (messege) {
      setIsHidden(false);
      timer = setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [messege]);

  function handleClose() {
    setIsHidden(true);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: isHidden,
      })}
    >
      <button
        onClick={handleClose}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {messege}
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
