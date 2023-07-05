/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/FilterTodos/FilterTodos';
import { Todo } from './types/Todo';
import { FilterOption } from './types/Filter';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

const USER_ID = 10918;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(FilterOption.ALL);

  const todosCount = todos.length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((errorFromServer) => {
        setError(errorFromServer.message || 'Error - todos was not loaded');
      });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const closeNotification = useCallback(() => {
    setError(null);
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FilterOption.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterOption.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosCount={todosCount} />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todosCount} items left`}
              </span>

              <FilterTodos
                filter={filter}
                setFilter={setFilter}
              />

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>

            </footer>
          </>
        )}

      </div>

      {error && (
        <ErrorNotification
          error={error}
          closeNotification={closeNotification}
        />
      )}
    </div>
  );
};
