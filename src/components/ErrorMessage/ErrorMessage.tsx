import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string;
  isError: boolean;
  setIsError: (value: boolean) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  isError,
  setIsError,
}) => {
  return (
    <div className={
      classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !isError,
        },
      )
    }
    >
      <button
        aria-label="close"
        type="button"
        className="delete"
        onClick={() => setIsError(false)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};
