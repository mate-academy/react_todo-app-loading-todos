import React from 'react';

export const ErrorNotification: React.FC<{
  errorNotification: string | null;
  setErrorNotification: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ errorNotification, setErrorNotification }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${errorNotification ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setErrorNotification(null)}
      aria-labelledby="button delete"
    />
    {errorNotification}
  </div>
);
