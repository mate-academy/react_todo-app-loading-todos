import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filter: FilterBy;
  onFilter: (selectedFilter: FilterBy) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onFilter }) => {
  const todosCounter = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todosCounter} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', { selected: filter === 'all' })}
            data-cy="FilterLinkAll"
            onClick={() => onFilter(FilterBy.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filter === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => onFilter(FilterBy.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filter === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => onFilter(FilterBy.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
