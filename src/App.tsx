import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.All);

  useEffect(() => {
    let timeoutId: number;

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        timeoutId = window.setTimeout(() => setError(''), 3000);
      });

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  function getVisiebleTodos(newTodos: Todo[], newStatus: Status) {
    switch (newStatus) {
      case Status.Active:
        return newTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const visiebleTodos = getVisiebleTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visiebleTodos} />
        {!!todos.length && (
          <Footer todos={todos} status={status} setStatus={setStatus} />
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
