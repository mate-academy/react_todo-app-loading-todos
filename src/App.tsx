import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';

import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/ErrorType';
import { Filters } from './types/FilterStatus';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [statuses, setStatuses] = useState<Filters>(Filters.All);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage(Errors.UnableToLoad);
        setTimeout(() => setErrorMessage(Errors.Default), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos?.filter(todo => {
    switch (statuses) {
      case Filters.Active:
        return todo.completed === false;

      case Filters.Completed:
        return todo.completed === true;

      default:
        return true;
    }
  });

  const countActiveTodos = todos?.filter(
    todo => todo.completed === false,
  ).length;

  const countCompletedTodos = todos?.filter(
    todo => todo.completed === true,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              statuses={statuses}
              setStatuses={setStatuses}
              countActiveTodos={countActiveTodos}
              countCompletedTodos={countCompletedTodos}
            />
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
