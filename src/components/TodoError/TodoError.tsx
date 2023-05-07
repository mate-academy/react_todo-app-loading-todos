/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react';
import classnames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoError: FC = () => {
  const { error, setError } = useContext(TodosContext);

  return (
    <div className={classnames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !error },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};
