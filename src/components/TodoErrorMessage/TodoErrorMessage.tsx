import classNames from 'classnames';
import React from 'react';
import { UseTodosContext } from '../../utils/TodosContext';
import { ErrorMessages } from '../../types/ErrorMessages';

const ERROR_MESSAGE_DISSAPEAR_DELAY = 3000;

type Props = {};

export const TodoErrorMessage: React.FC<Props> = () => {
  const context = UseTodosContext();

  const {
    errorMessage,
    setErrorMessage,
  } = context;

  const removeErrorMessage = () => setErrorMessage(ErrorMessages.Default);

  if (errorMessage) {
    setTimeout(removeErrorMessage, ERROR_MESSAGE_DISSAPEAR_DELAY);
  }

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !errorMessage,
      },
    )}
    >
      <button
        onClick={removeErrorMessage}
        type="button"
        className="delete"
      >
        x
      </button>
      {errorMessage}
    </div>
  );
};
