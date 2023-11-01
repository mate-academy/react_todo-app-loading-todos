/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';
import { Error } from './types/Error';

import { getTodos } from './api/todos';

const USER_ID = 7023;

const preparedTodos = (items: Todo[], filter: Filter): Todo[] => {
  let copy = [...items];

  copy = copy.filter(item => {
    switch (filter) {
      case Filter.All:
        return true;

      case Filter.Active:
        return !item.completed;

      case Filter.Completed:
        return item.completed;

      default:
        return true;
    }
  });

  return copy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [error, setError] = useState<Error>(Error.Default);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => setTodos(response))
      .catch(() => setError(Error.UnableLoadTodos));
    setTimeout(() => setError(Error.Default), 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const countLeft = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader userId={USER_ID} />
        {todos.length !== 0 && (
          <>
            <TodoList todos={preparedTodos(todos, filter)} />

            <TodoFooter
              setFilter={setFilter}
              filter={filter}
              countLeft={countLeft}
            />
          </>

        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoError error={error} resetError={setError} />
    </div>
  );
};
