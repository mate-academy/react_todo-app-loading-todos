/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { ShowError } from './components/ShowError/ShowError';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { FilterBy } from './types/Filter';

const USER_ID = 6156;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState('All');
  const [error] = useState('');

  const isAnyTodoCompleted
    = Boolean(todos.filter(todo => todo.completed).length);

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

  const handleFilterClick = (filter: FilterBy) => {
    if (todoFilter !== filter) {
      setTodoFilter(filter);

      switch (filter) {
        case FilterBy.all:
        default:
          setVisibleTodos(todos);
          break;
        case FilterBy.active:
          setVisibleTodos(todos.filter(todo => !todo.completed));
          break;
        case FilterBy.completed:
          setVisibleTodos(todos.filter(todo => todo.completed));
          break;
      }
    }
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
            onFilterClick={handleFilterClick}
            renderClearCompleted={isAnyTodoCompleted}
          />
        )}
      </div>

      <ShowError error={error} />
    </div>
  );
};
