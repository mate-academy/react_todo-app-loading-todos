import cn from 'classnames';
import React from 'react';

type Props = {
  error: string,
  setError: (error: string) => void,
  isErrorShown: boolean,
  setIsErrorShown: (value: boolean) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
  isErrorShown,
  setIsErrorShown,
}) => {
  const handleHideErrorClick = () => {
    setIsErrorShown(false);
    setError('');
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={
        cn(', notification is-danger is-light has-text-weight-normal', {
          hidden: !isErrorShown,
        })
      }
    >
      <button
        data-cy="HideErrorButton"
        aria-label="title"
        type="button"
        className="delete"
        onClick={handleHideErrorClick}
      />
      {error}
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
