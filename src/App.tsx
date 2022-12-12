import React, {
  useCallback,
  useContext,
  useEffect,
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

  const loadUserTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (error) {
        setHasError(true);
        setCurrentError('Unable to load user todos');
      }
    }
  }, []);

  useEffect(() => {
    loadUserTodos();
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

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

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              status={status}
            />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${activeTodos.length} items left`}
              </span>

              <TodoFilter
                status={status}
                setStatus={setStatus}
              />

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification
        currentError={currentError}
        setCurrentError={setCurrentError}
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
