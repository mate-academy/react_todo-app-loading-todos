import { FC, useState } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../../types/Todo';

export const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

type Props = {
  todos: Todo[];
};

export const Filter: FC<Props> = ({
  todos,
}) => {
  const [filter, setFilter] = useState(FILTERS.all);

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.all) {
      return true;
    }

    return filter === FILTERS.completed
      ? todo.completed
      : !todo.completed;
  });

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const incompletedTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <TodoList visibleTodos={visibleTodos} />

      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${incompletedTodosCount} items left`}
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={cn(
              'filter__link',
              { selected: filter === FILTERS.all },
            )}
            onClick={() => handleFilterChange(FILTERS.all)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn(
              'filter__link',
              { selected: filter === FILTERS.active },
            )}
            onClick={() => handleFilterChange(FILTERS.active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn(
              'filter__link',
              { selected: filter === FILTERS.completed },
            )}
            onClick={() => handleFilterChange(FILTERS.completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          disabled={completedTodosCount === 0}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
