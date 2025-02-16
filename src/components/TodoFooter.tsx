import classNames from 'classnames';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  filter: Filter;
  setFilter: (str: Filter) => void;
}

export const TodoFooter = ({ todos, filter, setFilter }: Props) => {
  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodosLength} items left
        </span>
        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'All',
            })}
            data-cy="FilterLinkAll"
            onClick={() => setFilter('All')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'Active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => setFilter('Active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'Completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter('Completed')}
          >
            Completed
          </a>
        </nav>
        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={todos.length === activeTodosLength}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
