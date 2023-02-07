/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { ShowError } from './components/ShowError/ShowError';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';

const USER_ID = 6156;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToRender, setTodosToRender] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState('All');
  const [error] = useState('');

  const renderClearCompleted
    = !!(todos.filter(todo => todo.completed).length);

  useEffect(() => {
    getTodos(USER_ID)
      .then(r => {
        setTodos(r);
        setTodosToRender(r);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilterClick = (filter: string) => {
    if (todoFilter !== filter) {
      setTodoFilter(filter);

      switch (filter) {
        case 'All':
        default:
          setTodosToRender(todos);
          break;
        case 'Active':
          setTodosToRender(todos.filter(todo => !todo.completed));
          break;
        case 'Completed':
          setTodosToRender(todos.filter(todo => todo.completed));
          break;
      }
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header userId={USER_ID} />

        <TodoList todos={todosToRender} />

        {todos.length !== 0 && (
          <TodoFilter
            filter={todoFilter}
            onFilterClick={handleFilterClick}
            renderClearCompleted={renderClearCompleted}
          />
        )}
      </div>

      <ShowError error={error} />
    </div>
  );
};
