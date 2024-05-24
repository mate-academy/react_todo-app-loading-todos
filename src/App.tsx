/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/header/Header';
import { TodoList } from './components/todoList/TodoList';
import { Footer, TodoStatus } from './components/footer/Footer';
// eslint-disable-next-line
import { ErrorNotification } from './components/errorNotification/ErrorNotification';

const getVisibleTodos = (todos: Todo[], status: TodoStatus) => {
  let visibleTodos = [...todos];

  if (status !== 'All') {
    visibleTodos = visibleTodos.filter(todo => {
      return status === 'Active' ? !todo.completed : todo.completed;
    });
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus>('All');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer todos={todos} status={status} setStatus={setStatus} />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
