/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/header/Header';
import { TodoList } from './components/todoList/TodoList';
import { Footer } from './components/footer/Footer';
import { Errors } from './components/errors/Errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('all');

  // Check USER_ID condition first

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        switch (status) {
          case 'all':
            setTodos(todosFromServer);
            break;
          case 'active':
            setTodos(todosFromServer.filter(todo => !todo.completed));
            break;
          case 'completed':
            setTodos(todosFromServer.filter(todo => todo.completed));
            break;
          default:
            setTodos(todosFromServer);
        }
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [status]); // Dependency array with status

  // Calculate leftItems based on todo state
  const leftItems = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={todos} />
        {todos.length > 0 && (
          <Footer onClick={setStatus} status={status} items={leftItems} />
        )}
      </div>

      <Errors errorMessage={errorMessage} onClose={setErrorMessage} />
    </div>
  );
};
