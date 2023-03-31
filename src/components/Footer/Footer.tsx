import classNames from 'classnames';
import { Filters } from '../../types/enums';

interface Props {
  selectedFilter: Filters;
  setSelectedFilter: (filter: Filters) => void;
  activeTodos: number;
  completedTodos: number;
}

export const Footer: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  activeTodos,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter">
        {Object.values(Filters).map(filter => (
          <a
            href="#/"
            className={classNames(
              'filter__link',
              { selected: filter === selectedFilter },
            )}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { hidden: completedTodos === 0 },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};
