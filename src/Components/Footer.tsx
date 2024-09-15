import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type Props = {
  filterType: FilterType;
  todos: Todo[];
  setFilterType: (filterType: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  filterType,
  todos,
  setFilterType,
}) => {
  const disableClearButton = todos.filter(todo => todo.completed).length === 0;
  const handleFilterClick = (type: FilterType) => {
    setFilterType(type);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map((type, index) => (
          <a
            key={index}
            href={`#/${type.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filterType === type,
            })}
            data-cy={`FilterLink${type}`}
            onClick={() => handleFilterClick(type)}
          >
            {type}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={disableClearButton}
      >
        Clear completed
      </button>
    </footer>
  );
};
