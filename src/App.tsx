/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { ErrorsNotification } from './components/ErrorsNotification';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 6391;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState<Filter>(Filter.ALL);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
    }
  };

  const prepareTodo = (todoStatus: Filter) => {
    switch (todoStatus) {
      case Filter.ALL:
        return todos;
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        throw new Error('Invalid todo status');
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const visibleTodos = prepareTodo(status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <Footer status={status} onStatusChange={setStatus} />
      </div>
      <ErrorsNotification hasError={hasError} onErrorChange={setHasError} />
    </div>
  );
};
