import React, { useContext, useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { TodoContext } from './context/TodoContext';
import { getTodos } from './api/todos';

const USER_ID = 11458;

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {!!todos.length && <TodoFooter />}
      </div>

      {errorMessage && (
        <TodoNotification
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
