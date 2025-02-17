/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Errors } from './components/errors/errors';
import { Footer } from './components/footer/footer';
import { ToDoList } from './components/todoList/todoList';
import { Header } from './components/header/header';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('all');

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
  }, [status]);

  const leftItems = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <ToDoList list={todos} />

        {todos.length > 0 && (
          <Footer onClick={setStatus} status={status} leftItems={leftItems} />
        )}
      </div>

      <Errors errorMessage={errorMessage} onClose={setErrorMessage} />
    </div>
  );
};
