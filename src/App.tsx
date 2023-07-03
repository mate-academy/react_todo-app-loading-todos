/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/FilterTodos/FilterTodos';
import { Todo } from './types/Todo';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

const USER_ID = 10918;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>('All');

  const todosCount = todos.length;
  const completedTodos = todos.some(todo => todo.completed);

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
    switch (filterValue) {
      case 'All':
        return todos;
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterValue]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

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
                filterValue={filterValue}
                setFilterValue={setFilterValue}
              />

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className={cn('todoapp__clear-completed', {
                  'todoapp__clear-hide': !completedTodos,
                })}
                disabled={!completedTodos}
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
