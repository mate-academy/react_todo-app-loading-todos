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
  const [todo, setTodo] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('all');

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        switch (status) {
          case 'all':
            setTodo(todosFromServer);
            break;
          case 'active':
            setTodo(todosFromServer.filter(todo => !todo.completed));
            break;
          case 'completed':
            setTodo(todosFromServer.filter(todo => todo.completed));
            break;

          default:
            setTodo(todosFromServer);
        }
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [status]);

  const leftItems = todo.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={todo} />
        {todo.length > 0 && (
          <Footer onClick={setStatus} status={status} items={leftItems} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Errors errorMessage={errorMessage} onClose={setErrorMessage} />
    </div>
  );
};
