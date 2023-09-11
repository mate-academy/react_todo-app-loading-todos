/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import React from 'react';
import { useTodo } from '../context/TodoContext';

export const Notification: React.FC = () => {
  const {
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
  } = useTodo();

  const handleButtonClick = () => {
    setIsError(false);
    setErrorMessage('');
  };

  return (

    <div className={classNames(
      'notification is - danger is - light has - text - weight - normal',
      { hidden: !isError },
    )}
    >
      <button
        type="button"
        className="delete"
        title="Click here"
        onClick={handleButtonClick}
      />

      {errorMessage}
    </div>
  );
};
