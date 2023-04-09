import classNames from 'classnames';
import { FilterType } from '../../enums/FilterType';

type Props = {
  todosCount: number;
  hasCompletedTodos: boolean;
  filterType: FilterType;
  onFilterTypeChange: (newType: FilterType) => void;
};

export const ListFilter: React.FC<Props> = ({
  todosCount,
  hasCompletedTodos,
  filterType,
  onFilterTypeChange,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${todosCount} items left`}
    </span>

    <nav className="filter">
      {(Object.keys(FilterType) as (keyof typeof FilterType)[]).map(
        typeOfFilter => {
          const type = FilterType[typeOfFilter];

          return (
            <a
              href={type !== 'all'
                ? `#/${type}`
                : '#/'}
              className={classNames(
                'filter__link',
                { selected: filterType === type },
              )}
              onClick={() => onFilterTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </a>
          );
        },
      )}
    </nav>

    {hasCompletedTodos && (
      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    )}
  </footer>
);
