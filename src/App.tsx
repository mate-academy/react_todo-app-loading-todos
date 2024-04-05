/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import * as todosService from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { StateContext } from './lib/TodosContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(StateContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todosService.getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 2000);
      }
    };

    fetchTodos();
  }, [setTodos]);

  if (!todosService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {/* Hide the footer if there are no todos */}
        {!errorMessage && !!todos.length && (
          <>
            <TodoList />

            <Footer />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
