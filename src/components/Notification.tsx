/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
};

export const Notification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  const onClick = () => {
    setErrorMessage('');
  };

  let timer: number;

  useEffect(() => {
    timer = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={
        classNames('notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage })
      }
    >
      <button
        type="button"
        className="delete"
        onClick={onClick}
      />
      {errorMessage}
    </div>
  );
};
