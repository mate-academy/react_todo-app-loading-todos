/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoNotification } from './components/TodoNotification';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { getTodos } from './api/todos';

const USER_ID = 10137;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<Error>(Error.None);

  const getTodosList = async () => {
    try {
      const todosFromData = await getTodos(USER_ID);

      setTodos(todosFromData);
    } catch {
      setError(Error.Get);
    }
  };

  useEffect(() => {
    getTodosList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(Error.None);
    }, 3000);
  }, [error]);

  const getFilteredTodos = () => {
    switch (filter) {
      case Filter.Active:
        return [...todos].filter(todo => !todo.completed);

      case Filter.Completed:
        return [...todos].filter(todo => todo.completed);

      default:
        return [...todos];
    }
  };

  const visibleTodos = getFilteredTodos();
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const activeAllTodos = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm activeAllTodos={activeAllTodos} />

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFilter
              filter={filter}
              setFilter={setFilter}
              hasCompletedTodos={hasCompletedTodos}
            />
          </>
        )}
      </div>

      <TodoNotification
        error={error}
        setError={setError}
      />

    </div>
  );
};
