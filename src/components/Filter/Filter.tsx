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
  onCompleted: () => void;
  onAll: () => void;
  onActive: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  todos,
  filterValue,
  onCompleted,
  onAll,
  onActive,
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
        onClick={onAll}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterValue === FilterEnum.Active,
        })}
        onClick={onActive}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterValue === FilterEnum.Completed,
        })}
        onClick={onCompleted}
      >
        Completed
      </a>
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
