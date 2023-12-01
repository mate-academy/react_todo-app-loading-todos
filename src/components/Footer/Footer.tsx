import { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/FilterEnum';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setFilterBy: (item: Status) => void;
  filterBy: string;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  setFilterBy,
  filterBy,
}) => {
  const clearButton = todos.find(todo => todo.completed);

  const handleClearButton = useCallback(() => {
    const completedTodos = todos.filter(todo => !todo.completed);

    setTodos(completedTodos);
  }, [todos]);

  const handleCount = useCallback(() => {
    const filteredTodos = todos.filter(
      todo => !todo.completed,
    );

    return filteredTodos.length;
  }, [todos]);

  const count = handleCount();

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {count === 1 ? (
            `${count} item left`
          ) : (
            `${count} items left`
          )}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={filterBy === Status.All ? 'selected' : ''}
            data-cy="FilterLinkAll"
            onClick={() => setFilterBy(Status.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={filterBy === Status.Active ? 'selected' : ''}
            data-cy="FilterLinkActive"
            onClick={() => setFilterBy(Status.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={filterBy === Status.Completed ? 'selected' : ''}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilterBy(Status.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        {clearButton && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleClearButton}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
