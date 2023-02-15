/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Error } from './components/Error/Error';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { FilterBy } from './types/Filter';
import { ErrorOf } from './types/Error';

const USER_ID = 6156;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState(FilterBy.all);
  const [error] = useState(ErrorOf.none);

  const isAnyTodoCompleted
    = todos.some(todo => todo.completed);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setVisibleTodos(response);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const changeTodosFilter = (filter: FilterBy) => {
    if (todoFilter === filter) {
      return;
    }

    setTodoFilter(filter);

    setVisibleTodos(todos.filter(todo => {
      switch (filter) {
        case FilterBy.all:
        default:
          return true;
        case FilterBy.active:
          return !todo.completed;
        case FilterBy.completed:
          return todo.completed;
      }
    }));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header userId={USER_ID} />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <TodoFilter
            filter={todoFilter}
            filterTodos={changeTodosFilter}
            renderClearCompleted={isAnyTodoCompleted}
          />
        )}
      </div>

      <Error error={error} />
    </div>
  );
};
