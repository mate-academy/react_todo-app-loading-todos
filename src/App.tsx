/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Error from './components/Error';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // Стейт для хранения данных полученных из сервера
  const [todos, setTodos] = useState<Todo[]>([]);
  // Стейт для хранения сообщений об ошибке
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Получение данных из сервера
  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {errorMessage}
      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList />

        {/* Hide the footer if there are no todos */}
        <Footer />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error />
    </div>
  );
};
