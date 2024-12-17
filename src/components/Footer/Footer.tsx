import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todosData: Todo[];
  filter: 'All' | 'Active' | 'Completed';
  setFilter: (filter: 'All' | 'Active' | 'Completed') => void;
};

export const Footer: React.FC<Props> = ({ todosData, filter, setFilter }) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}
      {todosData.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosData.filter(todo => !todo.completed).length} items left
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
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
