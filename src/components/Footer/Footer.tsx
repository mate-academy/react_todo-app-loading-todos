import cN from 'classnames';
import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';

type Props = {
  todos: Todo[],
  filteredBySelect: number,
  setFilteredBySelect: (value: number) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filteredBySelect,
  setFilteredBySelect,
}) => {
  const notCompletedTodo = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodo} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cN(
            'filter__link',
            { selected: filteredBySelect === SortType.All },
          )}
          onClick={() => setFilteredBySelect(SortType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cN(
            'filter__link',
            { selected: filteredBySelect === SortType.Active },
          )}
          onClick={() => setFilteredBySelect(SortType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cN(
            'filter__link',
            { selected: filteredBySelect === SortType.Completed },
          )}
          onClick={() => setFilteredBySelect(SortType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
