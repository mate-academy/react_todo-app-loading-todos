/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { Errors } from './types/Errors';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [status, setStatus] = useState<string>(Status.All);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage(Errors.UnableToLoad);
        const timer = setTimeout(() => setErrorMessage(''), 3000);

        return () => clearTimeout(timer);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (
      status === Status.All ||
      (status === Status.Completed && todo.completed) ||
      (status === Status.Active && !todo.completed)
    ) {
      return true;
    } else {
      return false;
    }
  });

  const countNotCompleted = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {todos.length !== 0 && (
          <Footer
            countNotCompleted={countNotCompleted}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
