import classNames from 'classnames';
import { Todo } from '../../../types/Todo';
import { SortType } from '../../../types/SortType';

type Props = {
  todos: Todo[];
  setFilteredSelect: (item: number) => void;
  filteredSelect: number;
};

export const Footer: React.FC<Props> = ({
  todos,
  filteredSelect,
  setFilteredSelect,
}) => {
  const notCompletedTodo = todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodo.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filteredSelect === SortType.All },
          )}
          onClick={() => setFilteredSelect(SortType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filteredSelect === SortType.Active },
          )}
          onClick={() => setFilteredSelect(SortType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filteredSelect === SortType.Completed },
          )}
          onClick={() => setFilteredSelect(SortType.Completed)}
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
