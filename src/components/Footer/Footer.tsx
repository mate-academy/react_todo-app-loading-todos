import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getCompletedTodos, getTodos, getActiveTodos } from '../../api/todos';
import { User } from '../../types/User';

interface Props {
  allTodos: Todo[] | null,
  activeTodos: Todo[] | null,
  user: User | null,
  setVisibleTodos: (userTodos: Todo[]) => void,
}

export const Footer: React.FC<Props> = (props) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const {
    allTodos,
    activeTodos,
    user,
    setVisibleTodos,
  } = props;

  const editTodos = (
    functonEdit: (number: number) => Promise<Todo[]>,
    activeFilter: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (user) {
      functonEdit(user.id)
        .then((userTodos: Todo[]) => setVisibleTodos(userTodos));
    }

    setSelectedFilter(activeFilter);

    event.preventDefault();
  };

  return (
    <>
      {(allTodos && allTodos.length > 0) && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos?.length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              className={classNames(
                { filter__link: true },
                { selected: selectedFilter === 'All' },
              )}
              onClick={(event) => {
                editTodos(getTodos, 'All', event);
              }}
            >
              All
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              className={classNames(
                { filter__link: true },
                { selected: selectedFilter === 'Active' },
              )}
              onClick={(event) => {
                editTodos(getActiveTodos, 'Active', event);
              }}
            >
              Active
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              className={classNames(
                { filter__link: true },
                { selected: selectedFilter === 'Completed' },
              )}
              onClick={(event) => {
                editTodos(getCompletedTodos, 'Completed', event);
              }}
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
      )}
    </>
  );
};
