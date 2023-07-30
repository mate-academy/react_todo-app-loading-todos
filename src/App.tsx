/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterTypes';

import { TodoHeader } from './Components/TodoHeader';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';
import { TodoError } from './Components/TodoError';

const USER_ID = 11131;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(FilterTypes.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  function loadTodos() {
    getTodos(USER_ID)
      .then(posts => setTodos(posts as Todo[]))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }

  useEffect(loadTodos, [USER_ID]);

  // eslint-disable-next-line
  const filteredTodos = useMemo(() => {
    switch (filterValue) {
      case FilterTypes.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case FilterTypes.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filterValue]);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

        {todos.length !== 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {todos.length !== 0 && (
          <TodoFooter
            activeTodos={activeTodos}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            todos={filteredTodos}
          />
        )}
      </div>

      <TodoError
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
