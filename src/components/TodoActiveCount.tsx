import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

export const TodoActiveCount = () => {
  const { todos } = useContext(TodosContext);
  const activeTasksCount = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="TodosCounter">
      {`${activeTasksCount} ${activeTasksCount === 1 ? 'item' : 'items'} left`}
    </span>
  );
};
