import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props{
  isTodosPresent: boolean;
}

export const TodoNotification: React.FC<Props> = ({ isTodosPresent }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 3000);
  }, []);

  return (
    <div
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHidden(true)}
        aria-label="Remove"
      />

      {/* show only one message at a time */}
      {!isTodosPresent && (
        <>
          Unable to load a todos
        </>
      )}

      {/*
      Unable to update a todo
      Unable to delete a todo
      Unable to add a todo */}
    </div>
  );
};
