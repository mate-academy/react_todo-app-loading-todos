/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { TodoCreatingForm } from './components/TodoCreatingForm';
import { ErrorNotification } from './components/ErrorNotification';
import { TodosContext } from './TodosContext';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filterStatus,
        setFilterStatus,
      }}
    >
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoCreatingForm />

          <section className="todoapp__main" data-cy="TodoList">
            {isLoading && <Loader />}

            {!isLoading && !errorMessage && <TodoList />}
          </section>

          {todos.length > 0 && <Footer />}
        </div>

        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </TodosContext.Provider>
  );
};
