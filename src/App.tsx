/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Errors } from './components/Errors';
import { TodoContent } from './components/TodoContent';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorMessages } from './types/ErrorMessages';

const USER_ID = 6232;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessages | null>(null);

  const filterTodos = (filterBy: Filter) => {
    switch (filterBy) {
      case Filter.active:
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      case Filter.completed:
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((result) => {
        setTodos(result);
        setFilteredTodos(result);
      })
      .catch(() => {
        setError(ErrorMessages.loadingTodos);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent todos={filteredTodos} filterTodos={filterTodos} />

      {error && <Errors error={error} />}
    </div>
  );
};
