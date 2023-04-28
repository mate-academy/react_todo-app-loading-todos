import classNames from 'classnames';
import { Filter } from '../utils/Filter';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[],
  selectedFilter: string,
  setSelectedFilter: (option: Filter) => void,
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  visibleTodos,
  setSelectedFilter,
}) => {
  return (
    <>
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${visibleTodos.length} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link',
              { selected: selectedFilter === Filter.All })}
            onClick={() => setSelectedFilter(Filter.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link',
              { selected: selectedFilter === Filter.Active })}
            onClick={() => setSelectedFilter(Filter.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link',
              { selected: selectedFilter === Filter.Completed })}
            onClick={() => setSelectedFilter(Filter.Completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={() => setSelectedFilter(Filter.Active)}
          style={{
            display: visibleTodos.some(todo => todo.completed)
              ? 'block' : 'none',
          }}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
