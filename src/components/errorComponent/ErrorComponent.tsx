/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { TodosContext } from '../../contexts/TodosContext';

export const ErrorComponent = () => {
  const { error, setError } = useContext(TodosContext);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timerID);
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        })
      }
    >
      <button
        onClick={() => setError('')}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {error}
    </div>
  );
};
