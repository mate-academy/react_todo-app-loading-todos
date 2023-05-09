import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[],
  filterType: FilterType,
  setFilterType: (option: FilterType) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  return (
    <>
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todos.length} items left`}
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link',
              { selected: filterType === FilterType.ALL })}
            onClick={() => setFilterType(FilterType.ALL)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link',
              { selected: filterType === FilterType.ACTIVE })}
            onClick={() => setFilterType(FilterType.ACTIVE)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link',
              { selected: filterType === FilterType.COMPLETED })}
            onClick={() => setFilterType(FilterType.COMPLETED)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={() => setFilterType(FilterType.ACTIVE)}
          style={{
            visibility: todos.some(todo => todo.completed)
              ? 'visible' : 'hidden',
          }}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
