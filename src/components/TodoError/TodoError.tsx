import React, { useEffect } from 'react';
import cn from 'classnames';

type Props = {
  todosError: string,
  isHidden: boolean,
  setIsHidden: (value: boolean) => void;
};

export const Error: React.FC<Props> = ({
  todosError,
  isHidden,
  setIsHidden,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [setIsHidden]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      {/* eslint-disable jsx-a11y/control-has-associated-label  */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsHidden(true);
        }}
      />
      {todosError}
      {/* show only one message at a time */}
      {/* Unable to load todos
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
