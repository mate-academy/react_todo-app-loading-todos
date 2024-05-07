import React, { useContext, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodosContext } from './TodosContext';
import { Header } from './components/Header';
import { USER_ID } from './constants';
import { Footer } from './components/Footer';
import { ErrorComponent } from './components/ErrorComponent';
import { handleErrorWithTimeout } from './utils/handleError';

export const App: React.FC = () => {
  const { todos, setTodos, setErrorMessage } = useContext(TodosContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        handleErrorWithTimeout('Unable to load todos', setErrorMessage);
      });
  }, [setTodos, setErrorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {todos.length > 0 && <Footer />}
      </div>

      <ErrorComponent />
    </div>
  );
};
