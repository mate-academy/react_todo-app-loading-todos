import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

function getVisibleTodos(todos: Todo[], selectedFilter: Filter) {
  if (selectedFilter === Filter.All) {
    return todos;
  }

  return todos.filter(
    todo => todo.completed === (selectedFilter === Filter.Completed),
  );
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const visibleTodos = getVisibleTodos(todos, selectedFilter);

  const errorTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);

    if (errorTimerId.current) {
      clearTimeout(errorTimerId.current);
    }

    errorTimerId.current = setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  const activeTodosCount = todos.filter(
    todo => todo.completed === false,
  ).length;

  const completedTodosCount = todos.filter(
    todo => todo.completed === true,
  ).length;

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
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              activeTodosCount={activeTodosCount}
              completedTodosCount={completedTodosCount}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
