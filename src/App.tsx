/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';

function getPrepearedTodos(
  todos: Todo[],
  {
    status,
  }: {
    status: Status;
  },
): Todo[] {
  let preparedTodos = [...todos];

  if (status) {
    switch (status) {
      case Status.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
    }
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  // const [newTodo, setNewTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = getPrepearedTodos(todos, { status });
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
        // status={status}
        // setStatus={setStatus}
        // newTodo={newTodo}
        // setNewTodo={setNewTodo}
        />

        {loading && 'Loader'}

        {!loading && <TodoList visibleTodos={visibleTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer length={activeCount} status={status} setStatus={setStatus} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
