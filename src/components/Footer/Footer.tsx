import cn from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type P = {
  todos: Todo[];
  activeFilter: Filter;
  updateFilter: (value: Filter) => void;
};

const FILTERS: Filter[] = ['All', 'Completed', 'Active'];

export function Footer({ todos, activeFilter, updateFilter }: P) {
  const completedTodos = todos.filter(todo => todo.completed);

  const notCompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTERS.map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={cn('filter__link', {
              selected: activeFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => updateFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedTodos.length > 0 && (
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
}
