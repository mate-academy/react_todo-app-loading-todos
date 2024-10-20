/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { Header } from './blocks/Header';
import { Footer } from './blocks/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setCurrentError(error.message);
        setTimeout(() => setCurrentError(null), 3000);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const onFilterChange = (filter: Filters) => {
    if (currentFilter === filter) {
      return;
    }

    setCurrentFilter(filter);

    const { all, active, completed } = Filters;

    switch (filter) {
      case all:
        setFilteredTodos(todos);
        break;
      case active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
    }
  };

  const isAllCompleted = useMemo(() => {
    return filteredTodos.every(todo => todo.completed);
  }, [filteredTodos]);

  const uncompletedCount = useMemo(() => {
    return todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header filteredTodos={filteredTodos} isAllCompleted={isAllCompleted} />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            uncompletedCount={uncompletedCount}
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification currentError={currentError} />
    </div>
  );
};
