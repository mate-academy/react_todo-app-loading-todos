/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Filters, TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoError } from './components/TodoError/TodoError';

import { useTodos } from './hooks/useTodos';

const USER_ID = 10538;

export const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filters>('all');

  const { todos, error } = useTodos(USER_ID);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const filterTodos = () => {
    switch (activeFilter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {
            activeTodos.length > 0
              && <button type="button" className="todoapp__toggle-all active" />
          }

          <TodoForm />
        </header>

        <TodoList todos={filteredTodos} />

        {
          todos.length > 0
            && (
              <TodoFilter
                activeFilter={activeFilter}
                changeFilter={setActiveFilter}
                activeTodos={activeTodos}
                completedTodos={completedTodos}
              />
            )
        }
      </div>

      {
        error && (<TodoError errorMsg={error} />)
      }
    </div>
  );
};
