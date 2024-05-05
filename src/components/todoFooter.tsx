import { useContext } from "react";
import cn from "classnames";
import { TodosContext } from "../services/Store";
import { Status } from "../types/Status";

export const TodoFooter: React.FC = () => {
  const { filter, setFilter, todos } = useContext(TodosContext);

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodos === 1
            ? `${activeTodos} item left`
            : `${activeTodos} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn("filter__link", {
              selected: filter === Status.All,
            })}
            data-cy="FilterLinkAll"
            onClick={() => setFilter(Status.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn("filter__link", {
              selected: filter === Status.Active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => setFilter(Status.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn("filter__link", {
              selected: filter === Status.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter(Status.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
