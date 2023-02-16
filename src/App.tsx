/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 6345;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // const [userId, setUserId] = useState<number>(USER_ID);

  type LoadTodos = (id: number) => Promise<Todo[]>;

  const handleFilterClick = async (loadTodos: LoadTodos) => {
    try {
      setErrorMessage('');
      const todosFromServer = await loadTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to recieve todos');
    }
  };

  useEffect(() => {
    handleFilterClick(getTodos);
    // getTodos(USER_ID);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        { !!todos.length
        && (
          <>
            <TodoList todos={todos} />
            <Footer onFilterClick={handleFilterClick} />
          </>
        )}
      </div>
      { !!errorMessage && <ErrorNotification errorMessage={errorMessage} /> }
    </div>
  );
};
