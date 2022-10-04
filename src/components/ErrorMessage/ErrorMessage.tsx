import React from 'react';

type Props = {
  errorType: string;
  setErrorType: (errorType: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({ errorType, setErrorType }) => {
  const handleHideError = () => {
    setErrorType('');
  };

  return (
    <>

      {errorType === 'empty' && (
        <>
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              aria-label="Close"
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />
            Title can`t be empty
            <br />

          </div>
        </>
      )}
      {errorType === 'delete' && (
        <>
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              aria-label="Close"
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />
            Unable to delete a todo
            <br />

          </div>
        </>
      )}

      {errorType === 'add' && (
        <>
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              aria-label="Close"
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />
            Unable to add a todo
            <br />

          </div>
        </>
      )}

      {errorType === 'update' && (
        <>
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              aria-label="Close"
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />
            Unable to update a todo
            <br />

          </div>
        </>
      )}

      {errorType === 'get' && (
        <>
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              aria-label="Close"
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />
            Unable to load a todo
            <br />

          </div>
        </>
      )}
    </>
  );
};
