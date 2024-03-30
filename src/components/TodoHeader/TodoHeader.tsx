import { useContext } from 'react';
import { TodoForm } from '../TodoForm/TodoForm';

import cn from 'classnames';
import { TodosContext, TodosControlContext } from '../context/TodosContext';

export const TodoHeader = () => {
  const { todos } = useContext(TodosContext);
  const { toggleAll } = useContext(TodosControlContext);
  const allCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: allCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />
      <TodoForm />
    </header>
  );
};
