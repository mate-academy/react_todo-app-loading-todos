/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo as TodoType } from './types/Todo';
import { Filter, FilterType } from './components/Filter';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [error, setError] = useState('');

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setError('');
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setError('Unable to load todos');
      }
    };

    if (USER_ID) {
      loadTodos();
    }
  }, []);

  const handleErrorHide = () => {
    setError('');
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasTodos = todos.length > 0;

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
              autoFocus
            />
          </form>
        </header>

        {hasTodos && <TodoList todos={todos} filter={filter} />}

        {/* Hide the footer if there are no todos */}
        {hasTodos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount === 1
                ? '1 item left'
                : `${activeTodosCount} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <Filter
              selectedFilter={filter}
              onFilterChange={handleFilterChange}
            />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        message={error}
        isVisible={!!error}
        onHide={handleErrorHide}
      />
    </div>
  );
};
