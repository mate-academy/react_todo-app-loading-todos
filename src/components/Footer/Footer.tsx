import classNames from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  notCompletedTodosCount: number;
  selectedTodos: FilterTypes;
  setSelectedTodos: (filterType: FilterTypes) => void;
};

export const Footer: React.FC<Props> = ({
  notCompletedTodosCount,
  selectedTodos,
  setSelectedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(FilterTypes).map(filterType => (
          <a
            href={filterType[0] === 'All' ? `#/` : `#/${filterType[0]}`}
            className={classNames('filter__link', {
              selected: selectedTodos === filterType[1],
            })}
            data-cy={`FilterLink${filterType[0]}`}
            onClick={() => {
              if (selectedTodos !== filterType[0]) {
                setSelectedTodos(filterType[1]);
              }
            }}
            key={filterType[0]}
          >
            {filterType[0]}
          </a>
        ))}
      </nav>

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
