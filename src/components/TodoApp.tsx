import React, { useEffect, useState } from 'react';
import { ErrorNotification } from './ErrorNotification';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { ErrorMessages } from '../types/ErrorMessages';
import { FilterOptions } from '../types/FilterOptions';
import { filterTodos } from '../utils/filterTodos';
import { Footer } from './Footer';
import { Header } from './Header';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  const visibleTodos = filterTodos(todos, filter);

  const clearError = () => setErrorMessage(null);

  const showError = (error: ErrorMessages) => {
    setErrorMessage(error);

    setTimeout(() => {
      clearError();
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessages.LoadTodos));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {!!todos.length && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} clearError={clearError} />
    </div>
  );
};
