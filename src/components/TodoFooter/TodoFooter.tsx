import classNames from 'classnames';
import { Filter } from '../../types/Todo';

type Props = {
  countTodoActive: number;
  filterStatus: Filter;
  setFilterStatus: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TodoFooter: React.FC<Props> = ({
  countTodoActive,
  filterStatus,
  setFilterStatus,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {countTodoActive}
      {' '}
      items left
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: filterStatus === Filter.ALL },
        )}
        onClick={() => setFilterStatus(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: filterStatus === Filter.ACTIVE },
        )}
        onClick={() => setFilterStatus(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: filterStatus === Filter.COMPLETED },
        )}
        onClick={() => setFilterStatus(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
