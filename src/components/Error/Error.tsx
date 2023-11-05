import React, { useEffect } from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  isErrorHidden: boolean;
  setIsErrorHidden: (value: boolean) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  isErrorHidden,
  setIsErrorHidden,
}) => {
  useEffect(() => {
    setTimeout(() => setIsErrorHidden(true), 3000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: isErrorHidden,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsErrorHidden(true)}
      />
      {errorMessage}
      {/* Unable to load todos */}
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
