import React, { useEffect, useMemo, useState } from 'react';
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

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);

      case FilterType.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [todos, filterType]);

  const handleChangeFilter = (filter: FilterType) => {
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
          <TodoList todos={filteredTodos} />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} item${activeTodos.length === 1 ? '' : 's'} left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={`filter__link ${filterType === FilterType.All ? 'selected' : ''}`}
                onClick={() => handleChangeFilter(FilterType.All)}
              >
                {FilterType.All}
              </a>

              <a
                href="#/active"
                className={`filter__link ${filterType === FilterType.Active ? 'selected' : ''}`}
                onClick={() => handleChangeFilter(FilterType.Active)}
              >
                {FilterType.Active}
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filterType === FilterType.Completed ? 'selected' : ''}`}
                onClick={() => handleChangeFilter(FilterType.Completed)}
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
