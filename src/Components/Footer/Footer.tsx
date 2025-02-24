import { Todo } from '../../types/Todo';
import { FILTER, Filter } from '../App';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  let completedTodosCounter = 0;
  const allFilterCN = classNames('filter__link', {
    selected: filter === FILTER.all,
  });
  const activeFilterCN = classNames('filter__link', {
    selected: filter === FILTER.active,
  });
  const completedFilterCN = classNames('filter__link', {
    selected: filter === FILTER.completed,
  });

  todos.forEach(todo => {
    if (!todo.completed) {
      completedTodosCounter++;
    }
  });

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosCounter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => setFilter(FILTER.all)}
          href="#/"
          className={allFilterCN}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => setFilter(FILTER.active)}
          href="#/active"
          className={activeFilterCN}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => setFilter(FILTER.completed)}
          href="#/completed"
          className={completedFilterCN}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
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
