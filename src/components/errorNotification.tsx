import cn from 'classnames';
import { useState } from 'react';

export const ErrorNotification = () => {
  const [isHidden, setIsHidden] = useState(false);

  setTimeout(() => setIsHidden(true), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: isHidden,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />
      {/* show only one message at a time */}
      Unable to load todos
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
