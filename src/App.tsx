import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './types/ErrorsMessage';
// import { Completed } from './types/Completed';
// import { getCompletedTodos } from './utils/getCompleteleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // const copletedTodos = todos ? getCompletedTodos(todos) : [];
  // const [completed, setCompleted] = useState<Completed[]>(copletedTodos);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoad);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filtredTodos = todos.filter(todo => {
    if (status === Status.Completed) {
      return todo.completed;
    }

    if (status === Status.Active) {
      return !todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const notCompletedTodos: number = todos.filter(
    todo => !todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} setTodos={setTodos} />
        {todos.length !== 0 && <TodoList todos={filtredTodos} />}
        {todos.length !== 0 && (
          <TodoFooter
            notCompletedTodos={notCompletedTodos}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
