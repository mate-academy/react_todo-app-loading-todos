import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../../types/Todo';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

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
          {
            LINKS.map(({ to, recentFilter }) => (
              <NavLink
                to={to}
                className={cn(
                  'filter__link',
                  { selected: filter === recentFilter },
                )}
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
