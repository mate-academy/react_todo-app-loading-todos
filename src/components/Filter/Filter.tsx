import classNames from 'classnames';
import { Todo } from '../../types/Todo';

enum FilterEnum {
  Active = 'active',
  All = 'all',
  Completed = 'completed',
}

interface FilterProps {
  todos: Todo[];
  filterValue: FilterEnum;
  onSelectCompleted: () => void;
  onSelectAll: () => void;
  onSelectActive: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  todos,
  filterValue,
  onSelectCompleted,
  onSelectAll,
  onSelectActive,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${todos.length} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterValue === FilterEnum.All,
        })}
        onClick={onSelectAll}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterValue === FilterEnum.Active,
        })}
        onClick={onSelectActive}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterValue === FilterEnum.Completed,
        })}
        onClick={onSelectCompleted}
      >
        Completed
      </a>
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
