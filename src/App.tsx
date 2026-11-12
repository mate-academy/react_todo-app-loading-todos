/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import type { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Errors from './components/Errors';
import { ErrorMessage } from './types/ErrorsMessage';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const visibleTodos = useMemo(() => {
    if (filter && Filter.Active) {
      return  todos.filter(todo => !todo.completed);
    } else if (filter && Filter.Completed) {
       return todos.filter(todo => todo.completed);
    } else {
      return todos;
    }
  }, [todos, filter]);
  
  const unCompletedNumber = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);


  useEffect(() => {
    setError(null);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const errorTime = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(errorTime);
  }, [error]);

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={formHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            unCompletedCount={unCompletedNumber}
            filter={filter}
            onFilterChange={setFilter}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>
      <Errors error={error} onClose={() => setError(null)} />
    </div>
  );
};
