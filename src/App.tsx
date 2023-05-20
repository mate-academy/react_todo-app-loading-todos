import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Notifications } from './components/Notifications/Notifications';

const USER_ID = 10513;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed), [todos],
  );

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [todos],
  );

  const filterTodos = () => {
    switch (filterType) {
      case FilterType.Completed:
        return completedTodos;

      case FilterType.Active:
        return activeTodos;

      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID).then(data => setTodos(data))
      .catch(() => {
        setHasError(true);
        setTimeout(() => {
          setHasError(false);
        }, 3000);
      });
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilter = (filter: FilterType) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setFilterType(filter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isActive={activeTodos.length > 0} />

        <TodoList todos={filterTodos()} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.All },
                )}
                onClick={handleFilter(FilterType.All)}
              >
                {FilterType.All}
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.Active },
                )}
                onClick={handleFilter(FilterType.Active)}
              >
                {FilterType.Active}
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.Completed },
                )}
                onClick={handleFilter(FilterType.Completed)}
              >
                {FilterType.Completed}
              </a>
            </nav>

            {completedTodos.length > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}

          </footer>
        )}
      </div>

      {hasError && (
        <Notifications />
      )}
    </div>
  );
};
