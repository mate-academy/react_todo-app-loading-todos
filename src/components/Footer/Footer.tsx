import { useTodosContext } from '../../hooks/useTodosContext';
import { TodoFilter } from '../TodoFilter';

export const Footer: React.FC = () => {
  const { completedCount, notCompletedCount, filter, setFilter } =
    useTodosContext();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedCount} items left`}
      </span>

      <TodoFilter filter={filter} onFilterChange={setFilter} />

      <button
        type="button"
        disabled={completedCount < 1}
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
