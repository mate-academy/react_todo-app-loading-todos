import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from
  './components/ErrorNotifications/ErrorNotifications';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<string>('');

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const loadUserTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (error) {
        setCurrentError('add');
        setHasError(true);
      }
    }
  }, []);

  const resetCurrentError = useCallback(
    () => {
      setCurrentError('');
      setHasError(false);
    },
    [currentError],
  );

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    setTimeout(() => {
      resetCurrentError();
    }, 3000);

    loadUserTodos();
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

  const getVisibleTodos = useCallback((): Todo[] => {
    return todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return todos;
      }
    });
  }, [todos, status]);

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, status],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="ToggleAllButton"
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              {
                active: activeTodos.length === 0,
              },
            )}
          />

          <NewTodo newTodoField={newTodoField} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFilter
              todos={activeTodos}
              status={status}
              setStatus={setStatus}
            />
          </>
        )}
      </div>

      {currentError !== '' && (
        <ErrorNotification
          currentError={currentError}
          resetCurrentError={resetCurrentError}
          hasError={hasError}
        />
      )}
    </div>
  );
};
