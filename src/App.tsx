/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { Footer } from './components/Footer';
import { NewTodo } from './components/NewTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.all);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(currTodos => {
        setTodos(currTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  function prepareFilteredTodos(newStatus: Status) {
    switch (newStatus) {
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  const visibleTodos = prepareFilteredTodos(status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo todos={todos} setTodos={setTodos} />

        <TodoList todos={visibleTodos} setTodos={setTodos} />

        {todos.length > 0 && (
          <Footer todos={todos} status={status} onChangeStatus={setStatus} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification
        message={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
