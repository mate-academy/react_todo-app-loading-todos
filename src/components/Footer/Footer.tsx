import classNames from 'classnames';
import { Filters } from '../../utils/enums';

interface Props {
  selectedFilter: Filters;
  setSelectedFilter: (filter: Filters) => void;
  activeTodos: number;
}

export const Footer: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  activeTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
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

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
