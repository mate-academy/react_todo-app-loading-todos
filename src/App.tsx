/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filters';
import { Errors } from './types/Errors';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { ErrorNotification } from './components/ErrorNotification';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  const filteredTodos = todos?.filter(todo => {
    if (status === Filter.Completed) {
      return todo.completed;
    } else if (status === Filter.Active) {
      return todo.completed === false;
    } else {
      return true;
    }
  });

  const unfulfilledTodos = todos?.filter(todo => !todo.completed);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage(Errors.UnableToLoad);
        const timer = setTimeout(() => setErrorMessage(''), 3000);

        return () => clearTimeout(timer);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filteredTodos} />
        {todos.length !== 0 && (
          <TodoFooter
            status={status}
            setStatus={setStatus}
            unfulfilledTodos={unfulfilledTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
