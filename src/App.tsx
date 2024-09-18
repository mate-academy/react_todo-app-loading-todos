import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

import { USER_ID } from './api/todos';
import { todos as todosClient } from './api/todos';
import { ErrorNotification } from './Components/ErrorNotification';
import { TodoHead } from './Components/TodoHead';
import { TodoList } from './Components/TodoList';
import { TodoFilter } from './Components/TodoFilter';
import { Errors } from './types/Errors';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todosClient
      .get()
      .then(res => {
        setTodos(res);
        setFilteredTodos(res);
      })
      .catch(() => {
        window.setTimeout(() => {
          setErrorMessage(Errors.load);
        }, 300);
        setTodos([]);
      });
  }, []);

  useEffect(() => {
    switch (filter) {
      case Filters.completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      case Filters.active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case Filters.all:
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [filter]);

  useEffect(() => {
    window.setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHead />

        <TodoList todos={filteredTodos} />

        <TodoFilter todos={todos} filter={filter} onClick={setFilter} />
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
