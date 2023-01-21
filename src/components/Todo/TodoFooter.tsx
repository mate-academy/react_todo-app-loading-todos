import { FilterStatus } from '../../types/Filter';
import { toCapitalCase } from '../../utils/toCapitalCase';
import { useTodoContext } from '../../store/todoContext';

export const TodoFooter = () => {
  const { changeFilterStatus, todos } = useTodoContext();

  return (
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {todos.length && `${todos.length} items left`}
      </span>

      <nav
        className="filter"
        data-cy="Filter"
      >
        {(Object.keys(FilterStatus) as Array<keyof typeof FilterStatus>).map(
          status => (
            <a
              key={status}
              data-cy="FilterLinkAll"
              href={`#/${FilterStatus[status]}`}
              className="filter__link selected"
              onClick={() => changeFilterStatus(FilterStatus[status])}
            >
              {toCapitalCase(FilterStatus[status])}
            </a>
          ),
        )}
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
