/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { FilterCategory } from './utils/enums';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

const USER_ID = 10411;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterCategory, setFilterCategory] = useState(FilterCategory.All);
  const [hasError, setHasError] = useState(false);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    todos.filter(todo => {
      switch (filterCategory) {
        case 'Completed': return todo.completed;
        case 'Active': return !todo.completed;
        default: return todos;
      }
    });
  }, [todos, filterCategory]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header todos={filteredTodos} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={filteredTodos}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError && (
        <ErrorMessage setHasError={setHasError} />
      )}
    </div>
  );
};
