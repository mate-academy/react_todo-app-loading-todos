import { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  status: Status;
  setStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  status,
  setStatus,
}) => {
  const count = useMemo(
    () => todos.filter(todo => todo.completed === false).length,
    [todos],
  );

  const clearCompleted = () => {
    const clearedTodos = todos.filter(todo => !todo.completed);

    setTodos(clearedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      <TodoFilter status={status} setStatus={setStatus} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
