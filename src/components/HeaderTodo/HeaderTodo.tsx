import { FC, useContext } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../../Context/TodoContext';
import { FormHeader } from '../HeaderTodo/FormHeader';

export const HeaderTodo: FC = () => {
  const { todos, dispatch, allCompleted } = useContext(TodoContext);

  const handleToggleAll = () => {
    dispatch({ type: 'CHECK_ALL_TODO' });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <FormHeader />
    </header>
  );
};
