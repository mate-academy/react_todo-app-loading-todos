/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { prepareTodos } from './helpers';
import { Header } from './components/Header/Header';
import { ErrorType } from './types/ErrorType';
import { ErrorNotification } from './components/ErrorNotification';
import { Status } from './types/Status';

const USER_ID = 11855;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.all);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorType.cantLoadTodos));
  }, []);

  const todosOnPage = prepareTodos({
    todos,
    status,
  });

  const itemsLeft = todos.filter(todo => (
    !todo.completed
  )).length;

  const isSomeCompleted = todosOnPage.some(
    todo => todo.completed,
  );

  const isEveryCompleted = todosOnPage.every(
    todo => todo.completed,
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isEveryCompleted={isEveryCompleted}
        />

        <TodoList
          todos={todosOnPage}
        />

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            status={status}
            setStatus={setStatus}
            isSomeCompleted={isSomeCompleted}
          />
        )}

        {error && todos.length > 0 && (
          <ErrorNotification
            error={error}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
