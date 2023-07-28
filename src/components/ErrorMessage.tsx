/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../context/TodoContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const ErrorMessage: React.FC = () => {
  const { error, setError } = useContext(TodoContext);

  const errMessage = useRef(error);

  useEffect(() => {
    if (error) {
      errMessage.current = error;
      setTimeout(() => (() => setError(null)), 3000);
    }
  }, [error]);

  return (
    <div className={classNames('notification is-danger is-light has-text-weight-normal', {
      hidden: !error,
    })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {errMessage.current || error}
    </div>
  );
};
