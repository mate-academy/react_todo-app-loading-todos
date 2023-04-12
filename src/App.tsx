/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { Error } from './types/Error';
import { Todo } from './types/Todo';

const USER_ID = 6994;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error>(Error.Clear);
  const [status, setStatus] = useState('All');

  const filterTodos = useCallback((value: string) => setStatus(value), []);

  const visibleTodos = useMemo(() => {
    switch (status) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [status, todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => setError(Error.Get));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setError(Error.Clear), 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasTodos={!!todos.length} />

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
        </section>

        {!!todos.length && (
          <Footer status={status} filterTodos={filterTodos} />
        )}
      </div>

      <Notification error={error} setError={setError} />
    </div>
  );
};
