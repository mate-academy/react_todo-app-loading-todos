/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext';

export const Error: React.FC = () => {
  const {
    errorMessage,
    setErrorMessage,
    isVisible,
    setIsVisible,
  } = useContext(TodosContext);

  return (

    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setErrorMessage('');
          setIsVisible(false);
        }}
      />
      {errorMessage}
    </div>
  );
};
