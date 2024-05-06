import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';

export const ErrorComponent: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodosContext);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setErrorMessage('');
        }}
      />
      {errorMessage}
    </div>
  );
};
