import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../../types/Todo';

enum FILTERS {
  all = 'All',
  completed = 'Completed',
  active = 'Active',
}

const LINKS = [
  {
    to: '/',
    recentFilter: FILTERS.all,
  },
  {
    to: '/active',
    recentFilter: FILTERS.active,
  },
  {
    to: '/completed',
    recentFilter: FILTERS.completed,
  },
];

type Props = {
  todos: Todo[];
};

export const Filter: FC<Props> = ({
  todos,
}) => {
  const [filter, setFilter] = useState<FILTERS>(FILTERS.all);

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.all) {
      return true;
    }

    return filter === FILTERS.completed
      ? todo.completed
      : !todo.completed;
  });

  const handleFilterChange = (selectedFilter: FILTERS) => {
    setFilter(selectedFilter);
  };

  const completedTodosCount = useMemo(() => (
    todos.filter(todo => todo.completed).length
  ), [todos]);

  const incompletedTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  return (
    <>
      <TodoList visibleTodos={visibleTodos} />

      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${incompletedTodosCount} items left`}
        </span>

        <nav className="filter">
          {
            LINKS.map(({ to, recentFilter }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (cn(
                  'filter__link',
                  { selected: isActive },
                ))}
                onClick={() => handleFilterChange(recentFilter)}
              >
                {recentFilter}
              </NavLink>
            ))
          }
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
