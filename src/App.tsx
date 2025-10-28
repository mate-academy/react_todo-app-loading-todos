/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';
import { Filter, FilterStatus } from './components/Filter';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const shouldShowUserWarning = !USER_ID;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const focusedInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();

    if (focusedInput.current) {
      focusedInput.current.focus();
    }
  }, []);

  const getFilteredTodos = (todosToFilter: Todo[], filters: FilterStatus) => {
    switch (filters) {
      case FilterStatus.Active:
        return todosToFilter.filter(todo => !todo.completed);
      case FilterStatus.Completed:
        return todosToFilter.filter(todo => todo.completed);
      case FilterStatus.All:
      default:
        return todosToFilter;
    }
  };

  const filteredTodos = getFilteredTodos(todos, filter);
  const hasTodos = todos.length > 0;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);

  if (shouldShowUserWarning) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: allCompleted })}
            data-cy="ToggleAllButton"
            disabled={!hasTodos}
          />

          <NewTodo loading={isLoading} focusedInput={focusedInput} />
        </header>

        {hasTodos && <TodoList todos={filteredTodos} loading={isLoading} />}

        {hasTodos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
            </span>

            <Filter value={filter} onChange={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notification
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
