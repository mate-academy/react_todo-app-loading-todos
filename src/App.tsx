import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessages } from './types/ErrorMessages';

const USER_ID = 6345;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(
    ErrorMessages.NOERROR,
  );

  type LoadTodos = (id: number) => Promise<Todo[]>;

  const handleFilterClick = async (loadTodos: LoadTodos) => {
    try {
      const todosFromServer = await loadTodos(USER_ID);

      setErrorMessage(ErrorMessages.NOERROR);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage(ErrorMessages.ONLOAD);
    }
  };

  useEffect(() => {
    handleFilterClick(getTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        { !!todos.length && (
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
