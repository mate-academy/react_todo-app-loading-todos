/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  errorMessage: string;
  setErrorMessage: (err: string) => void;
};

export const ErrorMessage:React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <>
      {errorMessage && (
        <div
        // eslint-disable-next-line max-len
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      ) }
    </>
  );
};
