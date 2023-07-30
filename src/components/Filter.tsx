import React, { useContext } from 'react';
import cn from 'classnames';
import { FilterBy } from '../types/Todo';
import { TodosContext } from '../context/todosContext';

export const Filter: React.FC = () => {
  const {
    todos,
    filterBy,
    setFilterBy,
  } = useContext(TodosContext);

  const countActiveTodos = React.useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const isSomeTodosCompleted = React.useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countActiveTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.ALL,
          })}
          onClick={() => setFilterBy(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.ACTIVE,
          })}
          onClick={() => setFilterBy(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.COMPLETED,
          })}
          onClick={() => setFilterBy(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!isSomeTodosCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
