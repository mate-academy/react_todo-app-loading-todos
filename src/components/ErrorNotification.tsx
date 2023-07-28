/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { TodosContext } from '../context/TodoContext';
import { wait } from '../utils/wait';

export const ErrorNotification: React.FC = () => {
  const [, ,errorMsg, setErrorMsg] = useContext(TodosContext);

  useEffect(() => {
    wait(3000)
      .then(() => setErrorMsg(''));
  }, [errorMsg]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMsg },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setErrorMsg('')}
      />
      {errorMsg}
    </div>
  );
};
