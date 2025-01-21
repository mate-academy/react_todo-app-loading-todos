/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.ERROR_DEFAULT,
  );
  const [filterTodoBy, setFilterTodoBy] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const loadTodos = await getTodos();

        setTodos(loadTodos);
      } catch (error) {
        setErrorMessage(ErrorType.ERROR_LOADING);
        throw error;
      }
    };

    asyncFetch();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (FilterType.ACTIVE === filterTodoBy) {
        return !todo.completed;
      }

      if (FilterType.COMPLETED === filterTodoBy) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterTodoBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            sortTodoBy={filterTodoBy}
            onClick={setFilterTodoBy}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessageTodo={errorMessage}
        setError={setErrorMessage}
      />
    </div>
  );
};
