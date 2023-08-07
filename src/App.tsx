/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './types/Error';
import { FilterType } from './types/FilterType';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoError } from './components/TodoError';

const USER_ID = 11271;

function getVisibleTodos(todos: Todo[], filter: FilterType) {
  switch (filter) {
    case FilterType.Active:
      return todos.filter((todo) => !todo.completed);
    case FilterType.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(Error.None);
  const [filter, setFilter] = useState(FilterType.All);

  function loadPosts() {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Error.Load));
  }

  useEffect(loadPosts, []);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filter);
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFilter
              todos={todos}
              filter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
      </div>

      <TodoError
        error={errorMessage}
        onErrorChange={setErrorMessage}
      />
    </div>
  );
};
