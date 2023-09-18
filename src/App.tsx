/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { FilterOption } from './types/filterOption';
import { TodoList } from './components/todoList';
import { InCaseOfError } from './components/inCaseOfError';

const USER_ID = 11460;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [filterTodos, setFilterTodos]
  = useState<FilterOption>('All');

  const handleSetFilter = (newFilter: FilterOption) => {
    setFilterTodos(newFilter);
  };

  const handleShowError = (err: Errors) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        handleShowError(Errors.Update);
      });
  }, [todos]);

  const closeError = () => {
    setError(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <input />
        {todos && (
          <TodoList todos={todos} filterTodos={filterTodos} />)}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer
            data-handleSetFilter={handleSetFilter}
            data-todos={JSON.stringify(todos)}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error !== null && (
        <InCaseOfError
          error={error}
          closeError={closeError}
        />
      )}
    </div>
  );
};
