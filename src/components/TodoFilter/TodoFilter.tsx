import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  setFilter: (value: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      3 items left
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          {
            selected: filter === Filter.All,
          },
        )}
        onClick={() => setFilter(Filter.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          {
            selected: filter === Filter.Active,
          },
        )}
        onClick={() => setFilter(Filter.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          {
            selected: filter === Filter.Completed,
          },
        )}
        onClick={() => setFilter(Filter.Completed)}
      >
        Completed
      </a>
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
