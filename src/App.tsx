import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

const ERROR_HIDE_DELAY = 3000;

function getVisibleTodos(todos: Todo[], status: Status): Todo[] {
  switch (status) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.None);

  useEffect(() => {
    let timerId = 0;

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
        timerId = window.setTimeout(() => {
          setErrorMessage(ErrorMessage.None);
        }, ERROR_HIDE_DELAY);
      });

    return () => window.clearTimeout(timerId);
  }, []);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status),
    [todos, status],
  );

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const hasCompletedTodos = todos.some(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          hasTodos={todos.length > 0}
          isAllCompleted={activeTodosCount === 0}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              activeTodosCount={activeTodosCount}
              hasCompletedTodos={hasCompletedTodos}
              status={status}
              onStatusChange={setStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage(ErrorMessage.None)}
      />
    </div>
  );
};
