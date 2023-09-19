import { useContext } from 'react';
import classnames from 'classnames';

import { Status } from '../../types/Status';
import { FilterContext } from '../../context/FilterContext';
import { TodoContext } from '../../context/TodoContext';

export const TodoFooter = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);

  const clearCompleted = () => {
    const activeTodos = todos.filter(({ completed }) => !completed);

    setTodos(activeTodos);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(({ completed }) => !completed).length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classnames(
            'filter__link',
            {
              selected: selectedFilter === Status.All,
            },
          )}
          onClick={() => setSelectedFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classnames(
            'filter__link',
            {
              selected: selectedFilter === Status.Active,
            },
          )}
          onClick={() => setSelectedFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classnames(
            'filter__link',
            {
              selected: selectedFilter === Status.Completed,
            },
          )}
          onClick={() => setSelectedFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {!!todos.filter(({ completed }) => completed).length && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
