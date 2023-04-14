import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoInput } from './components/TodoInput/TodoInput';
import { FilterType } from './types/FilterType';
import { Notification } from './components/Notification/Notification';

const USER_ID = 7022;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  }, [todos]);

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed), [todos],
  );

  const filteredTodos = () => {
    switch (filterType) {
      case FilterType.Completed:
        return completedTodos;

      case FilterType.Active:
        return activeTodos;

      default:
        return todos;
    }
  };

  const handleChangeFilter = (filter: FilterType) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setFilterType(filter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput isActiveButton={activeTodos.length > 0} />

        <section className="todoapp__main">
          <TodoList todos={filteredTodos()} />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} item${activeTodos.length === 1 ? '' : 's'} left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.All },
                )}
                onClick={handleChangeFilter(FilterType.All)}
              >
                {FilterType.All}
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.Active },
                )}
                onClick={handleChangeFilter(FilterType.Active)}
              >
                {FilterType.Active}
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterType === FilterType.Completed },
                )}
                onClick={handleChangeFilter(FilterType.Completed)}
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

      {isError && (
        <Notification />
      )}
    </div>
  );
};
