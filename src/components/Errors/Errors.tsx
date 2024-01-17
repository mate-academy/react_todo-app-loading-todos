import { useEffect, useState } from 'react';
import cn from 'classnames';

export const Errors: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsActive(false), 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !isActive })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Delete"
        onClick={() => setIsActive(false)}
      />
      Unable to load todos
      {/* show only one message at a time
      <br />
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
