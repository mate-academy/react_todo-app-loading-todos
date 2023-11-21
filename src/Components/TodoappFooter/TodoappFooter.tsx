import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoappFilter } from '../TodoappFilter';

type Props = {
  todos: Todo[],
  filterBy: Filter,
  onFilterClick: (value: Filter) => void;
};

export const TodoappFooter: React.FC<Props> = ({
  todos,
  filterBy,
  onFilterClick,
}) => {
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <TodoappFilter
        filterBy={filterBy}
        onFilterClick={onFilterClick}
      />

      {/* don't show this button if there are no completed todos */}
      {completedTodosCount !== 0 && (
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
