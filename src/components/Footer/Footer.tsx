import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import '../../styles/index.scss';
import { Filter } from '../../types/enum';

type Props = {
  todos: Todo[];
  handleFilter: (todoFilter: Filter) => void;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  todos,
  handleFilter,
  filter,
}) => {
  const todosCounter = todos.filter((todo: Todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todosCounter === 1 ? (
          `${todosCounter} item left`
        ) : (
          `${todosCounter} items left`
        )}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          id="all"
          type="button"
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'All' },
          )}
          onClick={() => handleFilter(Filter.All)}
        >
          {Filter.All}
        </a>

        <a
          id="active"
          type="button"
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === 'Active' },
          )}
          onClick={() => handleFilter(Filter.Active)}
        >
          {Filter.Active}
        </a>
        <a
          id="completed"
          type="button"
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === 'Completed' },
          )}
          onClick={() => handleFilter(Filter.Completed)}
        >
          {Filter.Completed}
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
