import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props{
  areTodosPresent: boolean;
}

export const TodoNotification: React.FC<Props> = ({ areTodosPresent }) => {
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
      {!areTodosPresent && (
        <>
          Unable to load a todos
        </>
      )}

    </div>
  );
};
