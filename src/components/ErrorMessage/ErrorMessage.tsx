import React, { useEffect } from 'react';

type Props = {
  errorType: string,
  setError: (condition: boolean) => void,
};

export const ErrorMessage: React.FC<Props> = ({
  errorType,
  setError,
}) => {
  useEffect(() => {
    window.setTimeout(() => {
      setError(false);
    }, 3000);
  }, []);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => {
          setError(false);
        }}
      />
      {errorType}
      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
