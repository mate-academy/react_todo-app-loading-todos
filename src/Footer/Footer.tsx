import { TodoFilter } from '../TodoFilter';
import { useTodos } from '../context/TodosContext';

export const Footer: React.FC = () => {
  const { todos } = useTodos();

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodo = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos} items left
      </span>

      <TodoFilter />

      {isCompletedTodo && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
