import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  handleFilter: (selectedFilter: 'all' | 'active' | 'completed') => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, handleFilter }) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todos.filter(todo => !todo.completed).length} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', { selected: filter === 'all' })}
            data-cy="FilterLinkAll"
            onClick={() => handleFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filter === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => handleFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filter === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => handleFilter('completed')}
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
