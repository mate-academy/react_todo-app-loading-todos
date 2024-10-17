import { FilterTypes } from '../types/FilterTypes';
import cn from 'classnames';

interface Props {
  selectedFilterType: FilterTypes;
  onSelectedFilterType: (type: FilterTypes) => void;
  activeTodosCount: number;
}

const oneItem = '1 item left';

export const TodoFooter: React.FC<Props> = ({
  selectedFilterType,
  onSelectedFilterType,
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount === 1 ? oneItem : `${activeTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTypes).map(value => (
          <a
            key={value}
            href={value === FilterTypes.ALL ? `#/` : `#/${value.toLowerCase()}`}
            className={cn('filter__link', {
              selected: selectedFilterType === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => onSelectedFilterType(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!!activeTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
