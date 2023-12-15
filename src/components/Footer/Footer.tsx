import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: (filterType: string) => void;
  todos: Todo[];
  filterBy: string;
};

export const Footer: React.FC<Props> = ({
  onFilter,
  todos,
  filterBy,
}) => {
  const handleFilterChange = (filterType: string) => {
    const updatedFilter = filterBy === filterType ? '' : filterType;

    onFilter(updatedFilter);
  };

  const hasActiveTodos = todos.filter(todo => !todo.completed);
  const hasComletedTodo = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${hasActiveTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: filterBy === 'all' },
          )}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', { selected: filterBy === 'active' },
          )}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', { selected: filterBy === 'completed' },
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {hasComletedTodo.length
        ? (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => handleFilterChange('active')}
          >
            Clear completed
          </button>
        ) : null}
    </footer>
  );
};
