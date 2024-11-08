import classNames from 'classnames';
import { SelectedFilter } from '../types/SelectedFilter';

type Props = {
  itemLeft: number;
  selectedFilter: SelectedFilter;
  setSelectedFilter: (filter: SelectedFilter) => void;
};

export const Footer: React.FC<Props> = ({
  itemLeft,
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(SelectedFilter).map(button => {
          return (
            <a
              key={button}
              href={button === SelectedFilter.all ? '#/' : `#/${button}`}
              className={classNames('filter__link', {
                selected: selectedFilter === button,
              })}
              data-cy={`FilterLink${button}`}
              onClick={() => setSelectedFilter(button)}
            >
              {button}
            </a>
          );
        })}
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
  );
};
