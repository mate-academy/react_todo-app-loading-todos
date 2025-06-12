import React, { useMemo } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/TodoErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { useTodos } from './hooks/useTodos';
import { useFilteredTodos } from './hooks/useFilteredTodos';

export const App: React.FC = () => {
  const { todos, errorMessage, setErrorMessage, isLoading } = useTodos();
  const { visibleTodos, filter, setFilter } = useFilteredTodos(todos);

  const allTodosCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const resetError = () => setErrorMessage('');

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
              active: allTodosCompleted && Boolean(todos.length),
            })}
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

        {!isLoading && <TodoList todos={visibleTodos} />}

        {Boolean(todos.length) && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={resetError}
        setError={setErrorMessage}
      />
    </div>
  );
};
