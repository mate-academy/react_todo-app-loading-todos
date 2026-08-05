/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { ErrorNotification } from './ErrorNotification';
import { FilterList } from './FilterList';
import { TodoList } from './TodoList';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');

  const handleFilterChange = (nextFilter: FilterType) => {
    setFilter(nextFilter);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        if (isMounted) {
          setTodos(loadedTodos);
          setErrorMessage('');
        }
      } catch {
        if (isMounted) {
          setErrorMessage(ErrorMessage.UnableToLoadTodos);
        }
      }
    };

    loadTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => window.clearTimeout(timerId);
  }, [errorMessage]);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

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
            className={`todoapp__toggle-all ${
              todos.length > 0 && todos.every(todo => todo.completed)
                ? 'active'
                : ''
            }`}
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {visibleTodos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} item{activeTodosCount === 1 ? '' : 's'} left
            </span>

            <FilterList filter={filter} onFilterChange={handleFilterChange} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHide={() => setErrorMessage('')}
      />
    </div>
  );
};
