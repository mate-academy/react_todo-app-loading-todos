/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Fotter';
import { Error } from './components/Error/Erros';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

function filterTodos(todos: Todo[], status?: string | null) {
  const todosCopy = [...todos];

  if (status === 'active') {
    return todosCopy.filter(todo => todo.completed === false);
  }

  if (status === 'completed') {
    return todosCopy.filter(todo => todo.completed === true);
  }

  return todosCopy;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('all');
  const noTodos = todos.length === 0;
  const filteredTodos = filterTodos(todos, status);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList filteredTodos={filteredTodos} />

        {!noTodos && (
          <Footer todos={todos} status={status} onStatusChange={setStatus} />
        )}
      </div>

      <Error errorMessage={errorMessage} hideError={setErrorMessage} />
    </div>
  );
};
