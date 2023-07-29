/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';
import { getFilteredTodos } from './services/getFilteredTodo';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoError } from './types/TodoError';
import { TodoErrors } from './components/TodoErrors';

const USER_ID = 11235;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);
  const [errorMessage, setErrorMessage] = useState(TodoError.none);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(TodoError.load));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(TodoError.none), 3000);
    }
  }, [errorMessage]);

  const filteredTodos = getFilteredTodos(todos, filter);

  const countActiveTodos = todos.filter(
    (todo) => !todo.completed,
  ).length;

  const hasCompletedTodos = todos.some(
    (todo) => todo.completed,
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header countActiveTodos={countActiveTodos} />

        <TodoList
          todos={filteredTodos}
        />

        <TodoFooter
          countActiveTodos={countActiveTodos}
          hasCompletedTodos={hasCompletedTodos}
          filter={filter}
          onFilterChange={setFilter}
        />

        {errorMessage !== TodoError.none && (
          <TodoErrors
            errorMessage={errorMessage}
            onClose={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
