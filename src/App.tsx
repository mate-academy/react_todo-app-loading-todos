/* eslint-disable curly */

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isError, setIsError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const user = useContext(AuthContext);

  const getTodosList = () => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(data => setTodos(data))
      .catch(() => setIsError(Error.Update));
  };

  const filteredTodos = () => {
    if (!todos) return null;

    return todos?.filter((todo) => {
      switch (filter) {
        case Filter.Active: return !todo.completed;
        case Filter.Completed: return todo.completed;
        case Filter.All:
        default:
          return true;
      }
    });
  };

  const setFilterStatus = (arg: Filter) => {
    setFilter(arg);
  };

  useEffect(() => {
    getTodosList();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {todos && (
          <TodoList todos={filteredTodos()} />
        )}
        <Footer
          filter={filter}
          setFilter={setFilterStatus}
          todos={todos}
        />
      </div>

      {isError && (
        <ErrorNotification
          error={isError}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};
