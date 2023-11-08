/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Error } from './Error';
import { Header } from './Header';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { client } from './utils/fetchClient';

const USER_ID = 11894;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const loadTodos = () => {
    setErrorMessage('');
    client.get<Todo[]>('https://mate.academy/students-api/todos?userId=11894')
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setVisibleTodos(fetchedTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {visibleTodos && (
          <TodoList visibleTodos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setVisibleTodos={setVisibleTodos}
            clearCompletedTodos={clearCompletedTodos}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
