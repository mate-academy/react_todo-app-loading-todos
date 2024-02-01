/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarming';
import { HeaderTodo } from './components/HeaderTodo';
import { ListTodo } from './components/ListTodo';
import { FooterTodo } from './components/FooterTodo';
import { TodoFilter, Todo, ErrorType } from './types';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 90;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [currentFilter, setFilterTodos] = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => {
        setErrorType(ErrorType.LoadError);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case TodoFilter.All:
        return todos.filter(todo => !todo.completed);
      case TodoFilter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilterChange = (status: TodoFilter) => {
    setFilterTodos(status);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo />
        <ListTodo todos={filteredTodos} />
        {todos && !!todos.length && (
          <FooterTodo
            todos={filteredTodos}
            currentFilter={currentFilter}
            filterChange={handleFilterChange}
          />
        )}
      </div>
      <ErrorNotification
        errorType={errorType}
      />
    </div>
  );
};
