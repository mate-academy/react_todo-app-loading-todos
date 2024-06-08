import React from 'react';

export const ErrorNotification: React.FC<{
  isError: string | null;
  onSetError: (value: string | null) => void;
}> = ({ isError, onSetError }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${isError ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onSetError(null)}
    />
    {isError === 'Unable to load todos' && (
      <>
        Unable to load todos
        <br />
      </>
    )}
    {isError === 'Title should not be empty' && (
      <>
        Title should not be empty
        <br />
      </>
    )}
    {isError === 'Unable to add a todo' && (
      <>
        Unable to add a todo
        <br />
      </>
    )}
    {isError === 'Unable to delete a todo' && (
      <>
        Unable to delete a todo
        <br />
      </>
    )}
    {isError === 'Unable to update a todo' && (
      <>
        Unable to update a todo
        <br />
      </>
    )}
  </div>
);
