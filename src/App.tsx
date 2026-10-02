/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);

        setTimeout(() => {
          setHasError(false);
        }, 3000);
      });
  }, []);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} isLoading={isLoading} />
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <TodoFooter
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          hasError ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError(false)}
        />
        Unable to load todos
      </div>
    </div>
  );
};
