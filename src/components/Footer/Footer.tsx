import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  filterTodos: (event: string) => void,
  filterOption: boolean | null;
};

export const Footer: React.FC<Props> = (
  {
    todos,
    filterTodos,
    filterOption,
  },
) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => todo.completed === false).length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              className={classNames(
                'filter__link',
                {
                  selected: filterOption === null,
                },
              )}
              onClick={() => filterTodos('all')}
            >
              All
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              className={classNames(
                'filter__link',
                {
                  selected: filterOption === false,
                },
              )}
              onClick={() => filterTodos('active')}
            >
              Active
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              className={classNames(
                'filter__link',
                {
                  selected: filterOption,
                },
              )}
              onClick={() => filterTodos('completed')}
            >
              Completed
            </a>
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className={classNames(
              'todoapp__clear-completed',
              {
                'is-invisible': todos.every(todo => todo.completed === false),
              },
            )}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
