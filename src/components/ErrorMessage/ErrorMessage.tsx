import React, { useState, useEffect } from 'react';

type Props = {
  errorType: string;
  setErrorType: (errorType: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({ errorType, setErrorType }) => {
  const [wait, setWait] = useState(false);

  const handleHideError = () => {
    setErrorType('');
  };

  useEffect(() => {
    if (errorType) {
      setWait(true);
      setTimeout(() => {
        setWait(false);
      }, 3000);
    }
  }, [errorType]);

  return (
    <>

      {(errorType === 'empty') && wait && (
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
      {(errorType === 'delete') && wait && (
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

      {(errorType === 'add') && wait && (
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

      {(errorType === 'update') && wait && (
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

      {(errorType === 'get') && wait && (
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
