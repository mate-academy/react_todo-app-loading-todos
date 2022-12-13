/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

type Props = {
  isErrorLoad: boolean
};

export const ErrorNotification: React.FC<Props> = ({ isErrorLoad }) => {
  const [isError, setIsError] = useState(true);

  console.log(isErrorLoad, isError);
  useEffect(() => {
    setIsError(isErrorLoad);
    if (isError) {
      setTimeout(() => {
        setIsError(true);
      }, 3000);
    }
  }, [isErrorLoad]);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={isError}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(true)}
      />

      Unable to add a todo
      <br hidden />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
