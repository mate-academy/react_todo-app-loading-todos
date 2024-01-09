/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { getTodos } from './api/todos';
import { TodoHeader } from './components/Header/Header';
import { TodoList } from './components/ToodoList';
import { TodoFooter } from './components/TodoFooter';

const USER_ID = 11886;

const visibleTodos = ((todos: Todo[], filter: Filter): Todo[] => {
  const result = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
      case Filter.All:
        return true;
    }
  });

  return result;
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<Error>(Error.Default);

  const counter = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => setTodos(response))
      .catch(() => setError(Error.CantLoad));
    setTimeout(() => setError(Error.Default), 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader userId={USER_ID} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos(todos, filter)} />

            <TodoFooter
              filter={filter}
              setFilter={setFilter}
              counter={counter}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: error === Error.Default },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />

        {error === Error.CantLoad && (
          <>
            Unable to load todos
          </>
        )}
      </div>
    </div>
  );
};
